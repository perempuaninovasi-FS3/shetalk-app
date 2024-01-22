const avatarController = require("../controllers/Avatars/avatarController");
const express = require("express");
const router = express.Router();
const verifyApiKey = require("../middlewares/verifyApiKey");
const topicsController = require("../controllers/Topics/topicsController");
router.get("/", verifyApiKey, topicsController.index);
router.get("/:slug", verifyApiKey, topicsController.get);
module.exports = router;
