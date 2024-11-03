import AuthRequest from "@libs/auth/types";
import Error from "@libs/error";
import User from "@models/User";

const isAdministrator = (req, res, next) => {

  const address = req.headers['address'];
  const key = req.headers['key'];

  // Find the user
  User.findOne({ address }).then((user) => {
    if (!user) {
      return Error(res, 404, "USER_NOT_FOUND", "User not found");
    }

    if (!user.isAdmin) {
      return Error(res, 403, "NOT_ADMIN", "User is not an administrator");
    }

    if (user.key !== key) {
      return Error(res, 403, "INVALID_KEY", "Invalid key");
    }
    next();
  }).catch((err) => {
    return Error(res, 500, "UNKNOWN_ERROR", "Another error has occurred.", err);
  });
}

export default isAdministrator;