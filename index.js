require("dotenv").config();
const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const staticRoute = require("./routes/staticRouter");

const app = express();
const MONGODB_URL = process.env.MONGO_URL;

connectToMongoDB(MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("MongoDB connection failed", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

// ✅ Vercel-compatible export
module.exports = (req, res) => {
  app(req, res);
};
