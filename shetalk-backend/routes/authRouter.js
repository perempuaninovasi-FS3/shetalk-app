// const path = require("path");
// const moduleAlias = require("module-alias");
// // moduleAlias.addAlias("@models", path.join(__dirname, "../../src/models"));

const express = require("express");
const router = express.Router();

const authController = require("../controllers/Auth/authenticatedController");
const validator = require("../validators/");
const verifyAuthMiddleware = require("../middlewares/verifyAuth");

// [api/auth/login]
router.post(`/login`, validator.userValidator("login"), authController.login);

// [api/auth/logout]
router.post(`/logout`, verifyAuthMiddleware, authController.logout);

module.exports = router;
