const express = require("express");
const multer = require("multer");
const path = require("path");
const { checkAdmin } = require("../middlewares/checkAdmin");

const {
  getAllProperties,
  addNewProperty,
  updatePropertyById,
  getPropertyById,
  deletePropertyById,
  getPropertyByUserLocation,
  getPropertyByZipCode,
  viewRequests,
  declineRequest,
  approveRequest,
  getAllPropertiesForUsers,
  getNotifications,
} = require("../controllers/propertyController");

const propertyRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./images/"));
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      return cb(new Error("Only .png and .jpeg format allowed!"));
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array("image_url", 5);

//getters
propertyRouter.get("/", getAllProperties);
propertyRouter.get("/for/users", getAllPropertiesForUsers);
propertyRouter.get("/:prop_id", getPropertyById);
propertyRouter.get("/view/notifications", getNotifications);

propertyRouter.get("/find/near", getPropertyByUserLocation);
propertyRouter.get("/view/requests", checkAdmin, viewRequests);
propertyRouter.get("/zipCode/:zip", getPropertyByZipCode);

//posters
propertyRouter.post("/", checkAdmin, addNewProperty);

//patchers && putters
propertyRouter.patch("/:prop_id", checkAdmin, updatePropertyById);
propertyRouter.patch("/requests/:prop_id/decline", checkAdmin, declineRequest);
propertyRouter.patch("/requests/:prop_id/approve", checkAdmin, approveRequest);

//deleters
propertyRouter.delete("/:prop_id", checkAdmin, deletePropertyById);

// serch by zip code

module.exports = propertyRouter;
