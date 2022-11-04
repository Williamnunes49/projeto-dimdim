const { UnauthorizedError } = require("express-jwt");
const { ValidationError } = require("express-validation");

export default (error: any, req: any, res: any, next: any) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error);
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.status).json(error);
  }

  return res.status(500).json(error);
};