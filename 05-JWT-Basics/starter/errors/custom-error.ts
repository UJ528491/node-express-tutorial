export default class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
  statusCode: number;
}

// module.exports = CustomAPIError;
