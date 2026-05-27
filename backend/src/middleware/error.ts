import type { Request, Response , NextFunction} from 'express';
import type { HttpError } from '../utils/errors.js';

export const errorHandler = (err: HttpError ,req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500
  return res.status(statusCode).json({
    errorName: err.name || 'INTERNAL_SERVER_ERROR',
    message: statusCode === 500 ? 'Internal Server Error' : err.message
  })
}