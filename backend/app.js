//dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { DB_SERVER } = require("./config");

const usersRouter = require("./routers/usersRouter");
const propertyRouter = require("./routers/propertyRouter");
const { checkToken } = require("./middlewares/checkToken");

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_SERVER, { useUnifiedTopology: true })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

//initializations
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname,"public", "images")));

//routers
app.use("/api/users", usersRouter);
app.use("/api/properties", checkToken, propertyRouter);

//error handlers
app.all("*", (req, res, next) => {
  next(new Error("Oops!!! Route Not Found"));
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(new Error({ message: err.message }));
});

//bootstrap
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
