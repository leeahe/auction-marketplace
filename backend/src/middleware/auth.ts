import jwt from 'jsonwebtoken';
import type { Request, Response , NextFunction} from 'express';
import { NotAuthorisedError } from '../utils/errors.js';
import { extractToken } from '../utils/helpers.js';


export const authenticateToken = (req : Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization']
  const token = extractToken(header)
  if (!token) {
    return next(new NotAuthorisedError('Invalid or Empty Token'))
  }

  const jwt_secret = process.env.JWT_SECRET

  if (!jwt_secret) {
    return next(new Error('Interal Server Side Error'))
  }

  try {
    const decoded = jwt.verify(token, jwt_secret) as {userId: string}
    req.user = decoded.userId
    next()
  } catch {
    // passes error
    next(new  NotAuthorisedError('Invalid or Empty Token'))
  }
}