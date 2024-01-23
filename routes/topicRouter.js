const express = require("express");
const router = express.Router();

const topicsController = require("../controllers/Topics/topicsController");
const verifyApiKey = require("../middlewares/verifyApiKey");

// [api/topics]
router.get("/", verifyApiKey, topicsController.index);

// [api/topics/slugged-topics]
router.get("/:slug", verifyApiKey, topicsController.get);
module.exports = router;
