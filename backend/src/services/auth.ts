import jwt from 'jsonwebtoken';
import {validate} from 'deep-email-validator'
import { BadRequestError , NotFoundError, NotAuthorisedError} from '../utils/errors.js';
import User from '../models/User.js';
import Session from '../models/Session.js';
import bcrypt from 'bcrypt';

// function to register user account
// returns a userid and token
export const registerUser = async (
  userName: string,
  email: string,
  password: string
) => {
  if (!userName || !email || !password) {
    console.log(userName, email, password)
    throw new BadRequestError('Missing required fields')
  }
  const valid_email = await validate(email)

  if (!valid_email.valid) {
    throw new BadRequestError('Invalid Email')
  }
  const existingUser = await User.findOne({email})

  if (existingUser) {
    throw new BadRequestError('Email already exists')
  }

  if (password.length < 8) {
    throw new BadRequestError('Password must be greater than 8 characters')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    userName,
    email,
    hashedPassword
  })
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error ('Interal Server Error')
  }

  const token = jwt.sign(
    {userId: newUser._id.toString()},
    jwt_secret
  )

  const tokenHash = await bcrypt.hash(token, 10)

  await Session.create({
    userId:  newUser._id.toString(),
    tokenHash: tokenHash,
  })

  return {code: 201, userId: newUser._id.toString(), token: token}
}

// function to log user in
// returns a userid and token
export const loginUser = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new BadRequestError('Missing required fields')
  }

  const user = await User.findOne({email})

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const correctPassword = await bcrypt.compare(password, user.hashedPassword)

  if (!correctPassword) {
    throw new NotAuthorisedError('Username or password is incorrect')
  }

  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error ('Interal Server Error')
  }

  const token = jwt.sign(
    {userId: user._id.toString()},
    jwt_secret
  )

  const tokenHash = await bcrypt.hash(token, 10)

  await Session.create({
    userId:  user._id.toString(),
    tokenHash: tokenHash,
  })

  return {code: 200, userId: user._id.toString(), token: token}
}

// logs user out
export const logoutUser = async (token: string, userId: string) => {
  const sessions = await Session.find({userId, active: true})
  if (!sessions.length) {
    throw new NotAuthorisedError('Invalid or empty token')
  }

  let matchingSession = null
  for (const session of sessions) {
    const validToken = await bcrypt.compare(token, session.tokenHash)

    if (validToken) {
      matchingSession = session
      break
    }
  }

  if (!matchingSession) {
    console.log('heree')
    throw new NotAuthorisedError('Invalid or empty token')
  }

  matchingSession.active = false
  await matchingSession.save()
  return {code: 200, message: 'User Logged Out'}
}

export const changePassword = async (token: string, userId: string, oldPassword: string, newPassword: string) => {
  const user = await User.findById(userId)
  console.log(userId, user)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  const authorised = await bcrypt.compare(oldPassword, user.hashedPassword)

  if (!authorised) {
    throw new NotAuthorisedError('Invalid email or password')
  }

  if (oldPassword === newPassword) {
    throw new BadRequestError('New password must be different')
  } else if (newPassword.length < 8) {
    throw new BadRequestError('Password must be greater than 8 characters')
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10)

  user.hashedPassword = newHashedPassword
  user.save()

  return {code: 200, message: 'Password reset'}
}

export const getUserDetails = async (token: string, userId: string) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return {
    code: 200,
    userId: user._id,
    email: user.email,
    name: user.userName
  }
}