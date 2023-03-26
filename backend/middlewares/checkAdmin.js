const { SECRET } = require("../config.json");
const jwt = require("jsonwebtoken");

module.exports.checkAdmin = (req, res, next) => {
  try {
    const { user_role } = req.jwt_token;
    if (user_role !== "admin")
      return next(new Error("You have to be an Admin to access this route"));
    next();
  } catch (err) {
    next(err);
  }
};
