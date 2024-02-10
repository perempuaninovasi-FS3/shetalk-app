require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.APP_PORT || 3000;
const cors = require("cors");
const parser = require("body-parser");
const mainRouter = require("./routes");
const rateLimitMiddleware = require("./middlewares/rateLimiter");
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(rateLimitMiddleware);
app.use("/api", mainRouter);
app.use("/image/", express.static(path.join(__dirname, "public")));
app.get("/", async function (req, res) {
  return await res.status(404).json({
    success: false,
    message: "404 not found!.,use `/api` instead of `/`",
  });
});
app.use(async function (req, res) {
  console.log("404 Not Found!.");
  return await res.status(404).json({
    success: false,
    message: "404 Not Found!.",
  });
});

app.listen(port, function (req, res) {
  console.log("Listening!....");
});
