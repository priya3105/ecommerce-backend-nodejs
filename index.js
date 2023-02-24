const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/item");
const cartRoute=require("./controllers/cartController");
const orderRoute=require("./controllers/orderController");
const app = express();
dotenv.config();
app.use(express.json());
const dbURI = config.get("dbURI");
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("mongo db conected"))
  .catch((err) => console.log(err));
app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api",cartRoute);
app.use("/api",orderRoute);
const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`Server running on http://localhost:${port}`);
});
