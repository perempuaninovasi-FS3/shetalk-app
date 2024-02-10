const express = require("express");
const router = express.Router();

const fs = require("fs");
const multer = require("multer");
const path = require("path");

const userController = require("../controllers/User/userController");
const verifyAuthMiddleware = require("../middlewares/verifyAuth");
const validator = require("../validators/");
const { upload, storage } = require("../utils/uploader.utils");

// [api/user/profile/edit]
router.put(
  "/me/profile/edit",
  [upload.single("profile"), verifyAuthMiddleware],

  userController.edit_user_profile
);

// [api/user/me]
router
  .route("/me")
  .post(verifyAuthMiddleware, userController.get_user_)
  .get(verifyAuthMiddleware, userController.get_user_);

// [api/user/me/edit]
router.put(
  "/me/edit",
  [validator.userValidator("edit_user"), verifyAuthMiddleware],
  userController.edit_user_
);
module.exports = router;
