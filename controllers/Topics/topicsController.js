require("dotenv").config();
const { Topic } = require("../../database/models/");
const index = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    return await res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data topik!",
      data: topics,
    });
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const get = async (req, res) => {
  try {
    const topics = await Topic.findOne({ where: { slug: req.params.slug } });
    if (!topics) {
      return await res.status(404).json({
        success: false,
        message: "Data topik tidak di temukan!",
        data: [],
      });
    }
    return await res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data topik!",
      data: topics,
    });
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const exported_modules = { index, get };
module.exports = exported_modules;
