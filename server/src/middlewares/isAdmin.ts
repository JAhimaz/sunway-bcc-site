import AuthRequest from "@libs/auth/types";
import Error from "@libs/error";
import User from "@models/User";

const isAdministrator = (req, res, next) => {

  const address = req.headers['address'];

  // Find the user
  User.findOne({ address }).then((user) => {
    if (!user) {
      return Error(res, 404, "USER_NOT_FOUND", "User not found");
    }

    if (!user.isAdmin) {
      return Error(res, 403, "NOT_ADMIN", "You are not an administrator");
    }

    next();
  }).catch((err) => {
    return Error(res, 500, "USER_FIND_FAILED", "Failed to find user", err);
  });
}

export default isAdministrator;