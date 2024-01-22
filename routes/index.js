const express = require("express");
const router = express.Router();

const authRouter = require("../routes/authRouter");
const userRouter = require("../routes/userRouter");
const avatarRouter = require("../routes/avatarRouter");
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use(avatarRouter);
router.get("/", function (req, res) {
  return res.status(200).json({ success: true, message: "API ready to use." });
});

module.exports = router;
