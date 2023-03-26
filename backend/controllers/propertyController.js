const Property = require("../models/propertyModel");
const Notification = require("../models/notificationModel");
const User = require("../models/usersModel");

//getters
module.exports.getAllProperties = async (req, res, next) => {
  try {
    const result = await Property.find();
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllPropertiesForUsers = async (req, res, next) => {
  try {
    const result = await Property.find({ available: true });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.getPropertyById = async (req, res, next) => {
  try {
    const { prop_id } = req.params;
    const result = await Property.findOne({ _id: prop_id });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.getPropertyByUserLocation = async (req, res, next) => {
  try {
    const { long, lat } = req.query;
    const results = await Property.find({
      location: { $near: [long, lat] },
    }).limit(5);
    res.json({ success: true, results });
  } catch (err) {
    next(err);
  }
};

// find property by zip code
module.exports.getPropertyByZipCode = async (req, res, next) => {
  try {
    const { zip } = req.params;
    const result = await Property.find({ "property_address.zip": zip });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const { prop_id } = req.params;
    const result = await Property.findOne({ _id: prop_id });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.viewRequests = async (req, res, next) => {
  try {
    const result = await Property.find({
      "request.user_id": { $exists: true },
    });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

//posters
module.exports.addNewProperty = async (req, res, next) => {
  try {
    const new_property = req.body;
    const result = await Property.create({
      ...new_property,
      location: [new_property.long, new_property.lat],
      property_address: {
        street: new_property.street,
        city: new_property.city,
        state: new_property.state,
        zip: new_property.zip,
      },
      available: true,
    });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePropertyById = async (req, res, next) => {
  try {
    const { prop_id } = req.params;
    const result = await Property.deleteOne({ _id: prop_id });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePropertyById = async (req, res, next) => {
  try {
    const { prop_id } = req.params;
    const new_property = req.body;
    console.log(`${prop_id}: `, new_property);
    const result = await Property.updateOne(
      { _id: prop_id },
      {
        $set: {
          property_description: new_property.property_description,
          property_type: new_property.property_type,
          property_price: new_property.property_price,
          number_of_bedrooms: new_property.number_of_bedrooms,
          number_of_bathrooms: new_property.number_of_bathrooms,
          location: [new_property.long, new_property.lat],
          property_address: {
            street: new_property.street,
            city: new_property.city,
            state: new_property.state,
            zip: new_property.zip,
          },
        },
      }
    );
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

module.exports.declineRequest = async (req, res, next) => {
  try {
    const { prop_id } = req.params;
    const property = await Property.findOne({ _id: prop_id });
    const notify = await Notification.create({
      user_id: property.request.user_id,
      message: `Your request for ${property.property_description} has been declined. Handle your credit better next time.`,
      status: "declined",
    });
    const result = await Property.updateOne(
      { _id: prop_id },
      { $unset: { request: "" }, $set: { available: true } }
    );
    res.json({ success: true, result, notify });
  } catch (err) {
    next(err);
  }
};

module.exports.approveRequest = async (req, res, next) => {
  try {
    const { prop_id } = req.params;
    const property = await Property.findOne({ _id: prop_id });
    const notify = await Notification.create({
      user_id: property.request.user_id,
      message: `Your request for ${property.property_description} has been approved. Please proceed to the payment page to pay the deposit.`,
      status: "approved",
    });
    const user = await User.findOne({ _id: property.request.user_id });
    const result = await Property.updateOne(
      { _id: prop_id },
      {
        $set: {
          available: false,
          user: {
            user_id: user._id,
            user_name: user.user_name,
            user_email: user.user_email,
          },
        },
        $unset: { request: "" },
      }
    );
    res.json({ success: true, result, notify });
  } catch (err) {
    next(err);
  }
};

module.exports.getNotifications = async (req, res, next) => {
  try {
    const { _id } = req.jwt_token;
    const result = await Notification.find({ user_id: _id });
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};