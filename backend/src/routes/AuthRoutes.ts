import express from 'express'
import type { Request, Response } from 'express'
import { registerUser, loginUser, logoutUser } from '../services/auth.js'
import { HttpError } from '../utils/errors.js'
import {authenticateToken} from '../middleware/auth.js'
import { extractToken } from '../utils/helpers.js'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
  const {userName, email, password} = req.body
  try {
    const result = await registerUser(userName, email, password)
    return res.status(result.code).json({result})
  } catch (e) {
    const err = e as HttpError
    const statusCode = err.statusCode || 500
    console.log(e)
    return res.status(statusCode).json({
      errorName: err.name || 'INTERNAL_SERVER_ERROR',
      message: statusCode == 500 ? 'Internal Server error' : err.message
    })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  const {email, password} = req.body
  try {
    const result = await loginUser(email, password)
    return res.status(200).json(result)
  } catch (e) {
    const err = e as HttpError
    return res.status(err.statusCode).json({
      errorName: err.name,
      message: err.message
    })
  }
})

router.post('/logout', authenticateToken, async (req: Request, res: Response) => {
  const userId = req.user as string
  const token = extractToken(req.headers.authorization) as string
  try {
    const result = await logoutUser(token , userId) 
    return res.status(200).json(result)
  } catch (e) {
    const err = e as HttpError
    const statusCode = err.statusCode || 500
    console.log(e)
    return res.status(statusCode).json({
      errorName: err.name || 'INTERNAL_SERVER_ERROR',
      message: statusCode == 500 ? 'Internal Server error' : err.message
    })
  }

})

export default router