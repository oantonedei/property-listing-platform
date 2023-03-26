const express = require("express");
// const { getAllProperties } = require("../controllers/propertyController");
const {
  login,
  signup,
  requestPropertyById,
  getNotifications,
} = require("../controllers/usersController");
const { checkToken } = require("../middlewares/checkToken");
const usersRouter = express.Router();


//posters & patchers
usersRouter.post("/login", login);
usersRouter.post("/signup", signup);
usersRouter.patch("/request/:prop_id", checkToken, requestPropertyById);

module.exports = usersRouter;
