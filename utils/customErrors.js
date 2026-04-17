class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Missing or empty name") { super(message, 400); }
}

class NotFoundError extends AppError {
  constructor(message = "Profile not found") { super(message, 404); }
}

class UpstreamError extends AppError {
  constructor(apiName) {
    super(`${apiName} returned an invalid response`, 502);
  }
}

module.exports = { AppError, BadRequestError, NotFoundError, UpstreamError };