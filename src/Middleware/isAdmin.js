import { StatusCode } from "../Service/StatusCode.js";

export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return StatusCode.forbiddenResponse(res, "Access denied");
    }
    next();
  };
};
