const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    user_id: mongoose.Types.ObjectId,
    message: String,
    status: String,
}, { timestamps: true });

module.exports = mongoose.model("notification", NotificationSchema);