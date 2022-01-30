import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";
export default class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
  statusCode: number;
}
