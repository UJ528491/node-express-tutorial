class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
  statusCode: number = 500;
}

export default CustomAPIError;
