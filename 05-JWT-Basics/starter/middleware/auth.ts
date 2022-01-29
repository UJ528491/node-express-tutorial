import jwt from "jsonwebtoken";
import CustomAPIError from "../errors/custom-error";

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
  } catch (err) {
    throw new CustomAPIError("Not authorized to access this route ", 401);
  }
  next();
};

export default authenticationMiddleware;
