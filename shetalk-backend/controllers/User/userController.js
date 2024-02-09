require("dotenv").config();

const fileType = require("file-type");
const fs = require("fs");
const path = require("path");
const { User } = require("../../database/models/");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
    const user = await User.findOne({ where: { token: req.token } });
    return await res.status(200).json({
      success: true,
      message: "Login Sukses!",
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profiles: req.user.profile,
        sertifikat: req.user.sertifikat,
        total_answered: req.user.total_answered,
      },
    });
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};

const edit_user_ = async (req, res) => {
  try {
    var data = {};
    const users = await User.findByPk(req.user.id);
    // console.log(users.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ success: false, message: { errors: errors.array() } });
    }
    data.name = req.body.name;
    data.email = req.body.email;

    if (req.body.hasOwnProperty("recent_password")) {
      // console.log();
      const comparePass = bcrypt.compareSync(
        req.body.recent_password,
        users.password
      );
      if (!comparePass) {
        return await res.status(422).json({
          success: false,
          message: "Password tidak sesuai!",
        });
      }
      const newPassword = req.body.new_password;
      if (!newPassword) {
        return await res.status(422).json({
          success: false,
          message: "Password baru tidak boleh kosong!",
        });
      }
      if (newPassword.length < 6) {
        return await res.status(422).json({
          success: false,
          message: "Password minimal 6 karakter!",
        });
      }
      const confirmationNewPassword = req.body.confirmation_new_password;
      if (newPassword != confirmationNewPassword) {
        return await res.status(422).json({
          success: false,
          message: "Konfirmasi password tidak sama!",
        });
      }
      data.password = bcrypt.hashSync(newPassword, 10);
      console.log(data);
    }
    const updatedUser = await User.update(data, { where: { id: req.user.id } });
    if (updatedUser) {
      return await res.status(200).json({
        success: true,
        message: "Data diri berhasil diubah!",
        data: {
          id: users.id,
          name: req.body.name,
          email: req.body.email,
          role: users.role,
          profiles: users.profiles,
          sertifikat: users.sertifikat,
        },
      });
    }
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const exported_modules = { edit_user_profile, get_user_, edit_user_ };
module.exports = exported_modules;
