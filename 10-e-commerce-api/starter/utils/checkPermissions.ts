import CustomError from "../errors";

const checkPermissions = (requestUser: any, resourceUserId: any) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId) return;

  throw new CustomError.UnauthorizedError("You are not authorized");
};

export default checkPermissions;
