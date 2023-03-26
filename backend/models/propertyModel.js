const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    property_description: String,
    property_address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    location: [Number],
    property_type: String,
    property_price: Number,
    number_of_bedrooms: Number,
    number_of_bathrooms: Number,
    available: Boolean,
    image_url: [String], //image_url.path
    user: {
      user_id: mongoose.Types.ObjectId,
      user_name: String,
      user_email: String,
    },
    request: {
      user_id: mongoose.Types.ObjectId,
      number_of_months: Number,
      start_date: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("property", PropertySchema);
