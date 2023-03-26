const usersModel = require("../models/usersModel");
const Property = require("../models/propertyModel");
const Notification = require("../models/notificationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config.json");

module.exports.login = async (req, res, next) => {
  try {
    console.log("test");
    const user_client = req.body;
    // console.log(user_client);
    const user_db = await usersModel.findOne({
      user_email: user_client.user_email,
    });
    if (user_db) {
      const match = await bcrypt.compare(
        user_client.user_password,
        user_db.user_password
      );
      if (!match) {
        return next(new Error("User authentication failed"));
      }
      const token = jwt.sign(
        {
          _id: user_db._id,
          user_name: user_db.user_name,
          user_email: user_db.user_email,
          user_role: user_db.user_role,
        },
        SECRET
      );
      console.log(token);
      res.json({ success: true, results: token });
    } else {
      return next(new Error("user not found"));
    }
  } catch (err) {
    next(err);
  }
};
module.exports.signup = async (req, res, next) => {
  try {
    const new_user = req.body;
    const hashed_password = await bcrypt.hash(new_user.user_password, 10);
    const results = await usersModel.create({
      ...new_user,
      user_password: hashed_password,
    });
    res.json({ success: true, results });
  } catch (err) {
    next(err);
  }
};

module.exports.requestPropertyById = async (req, res, next) => {
  try {
    console.log("request property by id")
    console.log(req.body)
    const { prop_id } = req.params;
    const user_id = req.jwt_token._id;
    const result = await Property.updateOne(
      { _id: prop_id },
      {
        $set: {
          request: {
            user_id,
            number_of_months: req.body.duration,
            start_date: req.body.startDate,
          },
          available: false,
        },
      }
    );
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

