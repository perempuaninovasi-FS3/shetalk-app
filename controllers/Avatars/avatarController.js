require("dotenv").config();
const { Avatar } = require("../../database/models/");
const index = async (req, res) => {
  try {
    const avatars = await Avatar.findAll({ order: [["id", "ASC"]] });
    const transformedAvatars = avatars.map(
      ({ id, avatar_name, avatar_img, avatar_url }) => ({
        id,
        avatar_name,
        avatar_img,
        avatar_url,
      })
    );
    return await res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data avatar!",
      data: transformedAvatars,
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
    const avatars = await Avatar.findByPk(req.params.id);
    if (!avatars) {
      return await res.status(404).json({
        success: false,
        message: "Data avatars tidak di temukan!",
        data: [],
      });
    }
    const transformedAvatars = [avatars].map(
      ({ id, avatar_name, avatar_img, avatar_url }) => ({
        id,
        avatar_name,
        avatar_img,
        avatar_url,
      })
    );
    const avatar = transformedAvatars[0];
    return await res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data avatar!",
      data: avatar,
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
