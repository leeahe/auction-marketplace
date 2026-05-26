export class HttpError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  } 
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400)
    this.name = 'BAD_REQUEST'
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404)
    this.name = 'NOT_FOUND'
  }
}

export class NotAuthorisedError extends HttpError {
  constructor(message: string) {
    super(message, 401)
    this.name = 'NOT_AUTHORISED'
  }
}