require("dotenv").config();

const fileType = require("file-type");
const fs = require("fs");
const path = require("path");
const { User } = require("../../database/models/");
const edit_user_profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak di temukan!" });
    }

    // Validation
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: "File hanya berupa gambar!" });
    }

    // Check if the user already has a profile image
    if (user.profile != null) {
      // Delete the existing profile image
      const imagePath = path.join(
        __dirname,
        "../../public/profiles/",
        user.profile
      );
      fs.unlinkSync(imagePath);
    }

    // Validate file size (10MB minimum)
    if (file.size < 10 * 1024 * 1024) {
      // Save the new profile image filename to the database
      user.profile = file.filename;
      await user.save();

      res.status(200).json({ message: "Profile sukses dirubah!" });
    } else {
      return res.status(400).json({ message: "Ukuran minimal 10MB!" });
    }
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const get_user_ = async (req, res) => {
  try {
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};

const edit_user_ = async (req, res) => {
  try {
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const exported_modules = { edit_user_profile, get_user_, edit_user_ };
module.exports = exported_modules;
