// const path = require("path");
// const moduleAlias = require("module-alias");
// // moduleAlias.addAlias("@models", path.join(__dirname, "../../src/models"));

const express = require("express");
const router = express.Router();
const verifyApiKeyMiddleware = require("../middlewares/verifyApiKey");
const verifyUnrequiredToken = require("../services/verifyTokenService"); // authorize/authorization gak wajib
const postController = require("../controllers/Posts/postController");
const validator = require("../validators/");

// [api/posts?page=1{for paginate}]
router.get("/posts", verifyApiKeyMiddleware, postController.index);

// [api/post/{for slug}]
router.get(
  "/post/:slug",
  [verifyApiKeyMiddleware, verifyUnrequiredToken],
  postController.get
);
router.post(
  "/posts",
  [
    verifyUnrequiredToken,
    validator.postValidator("create"),
    verifyApiKeyMiddleware,
  ],
  postController.create_new_post
);
module.exports = router;
