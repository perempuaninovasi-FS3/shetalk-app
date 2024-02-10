// const path = require("path");
// const moduleAlias = require("module-alias");
// // moduleAlias.addAlias("@models", path.join(__dirname, "../../src/models"));

const express = require("express");
const router = express.Router();

const commentController = require("../controllers/Comments/commentController");
const verifyAuthMiddleware = require("../middlewares/verifyAuth");
const verifyApiKeyMiddleware = require("../middlewares/verifyApiKey");
const checkRoleMiddleware = require("../middlewares/checkRole");
const validator = require("../validators/");
// [api/comment?post_id={id post}]
router.get("/", verifyApiKeyMiddleware, commentController.get_comment);

// [api/comment?post_id={id post}]
router.post(
  "/",
  [
    verifyApiKeyMiddleware,
    verifyAuthMiddleware,
    checkRoleMiddleware("admin,ahli"),
    validator.commentValidator("create"),
  ],
  commentController.create_new_comment
);

// [api/comment?post_id={id post}]
router.delete(
  "/",
  [
    verifyApiKeyMiddleware,
    verifyAuthMiddleware,
    checkRoleMiddleware("admin,ahli"),
  ],
  commentController.delete_comment
);

// [api/comment/users]
router.get('/users', verifyAuthMiddleware, commentController.get_comments_user);

module.exports = router;
