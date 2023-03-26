const { SECRET } = require("../config.json");
const jwt = require("jsonwebtoken");

module.exports.checkToken = (req, res, next) => {
  try {
    const auth_string = req.headers["authorization"];
    if (!auth_string) return next(new Error("Token is required"));
    const jwt_token = auth_string.split(" ")[1];
    // decode the token
    const decoded_token = jwt.verify(jwt_token, SECRET);
    // add the decoded token to the request object
    req.jwt_token = decoded_token;
    next();
  } catch (err) {
    next(err);
  }
};
