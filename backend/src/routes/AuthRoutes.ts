import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { registerUser, loginUser, logoutUser, changePassword, getUserDetails } from '../services/auth.js'
import {authenticateToken} from '../middleware/auth.js'
import { extractToken } from '../utils/helpers.js'

const router = express.Router()

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const {userName, email, password} = req.body
  try {
    const result = await registerUser(userName, email, password)
    return res.status(result.code).json(result)
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body
  try {
    const result = await loginUser(email, password)
    return res.status(200).json(result)
  } catch (e) {
    next(e)
  }
})

router.post('/logout', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user as string
  const token = extractToken(req.headers.authorization) as string
  try {
    const result = await logoutUser(token , userId) 
    return res.status(200).json(result)
  } catch (e) {
    next(e)
  }
})

router.put('/change-password', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const {oldPassword, newPassword} = req.body
  const userId = req.user as string
  const token = extractToken(req.headers.authorization) as string
  console.log(token, userId, 'route')
  try {
    const result = await changePassword(token, userId, oldPassword, newPassword)
    return res.status(200).json(result)
  } catch (e) {
    next(e)
  }
})

router.get('/get-user', authenticateToken,  async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user as string
  const token = extractToken(req.headers.authorization) as string

  try {
    const result = await getUserDetails(token, userId)
    return res.status(200).json(result)
  } catch (e) {
    next(e)
  }
})

export default router