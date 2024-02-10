const express = require("express");
const router = express.Router();

// const fs = require("fs");
// const multer = require("multer");
// const path = require("path");

const userController = require("../controllers/User/userController");
const verifyAuthMiddleware = require("../middlewares/verifyAuth");
const validator = require("../validators/");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/profiles");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(null, false, {
//         status: false,
//         message: "File hanya berupa gambar saja!",
//       });
//     }
//     cb(null, true);
//   },
// });

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
