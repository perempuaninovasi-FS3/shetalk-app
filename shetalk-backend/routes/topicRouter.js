const express = require("express");
const router = express.Router();

const topicsController = require("../controllers/Topics/topicsController");
const verifyApiKeyMiddleware = require("../middlewares/verifyApiKey");

// [api/topics]
router.get("/", verifyApiKeyMiddleware, topicsController.index);

// [api/topics/slugged-topics]
router.get("/:slug", verifyApiKeyMiddleware, topicsController.get);
module.exports = router;
