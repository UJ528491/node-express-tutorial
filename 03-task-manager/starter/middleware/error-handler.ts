import { CustomAPIError } from "../errors/custom-error"
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.tatus(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: `Something went wrong, please try again` })
}

export default errorHandler
