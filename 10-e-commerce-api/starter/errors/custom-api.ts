const { StatusCodes } = require("http-status-codes");
class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
  statusCode: number = StatusCodes.BAD_REQUEST;
}

export default CustomAPIError;
