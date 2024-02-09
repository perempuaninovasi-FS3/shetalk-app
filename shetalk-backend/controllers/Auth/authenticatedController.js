// const path = require("path");
// const moduleAlias = require("module-alias");
// // moduleAlias.addAlias("@models", path.join(__dirname, "../../src/models"));
const bcrypt = require("bcrypt");
const { User } = require("../../database/models/");
const { validationResult } = require("express-validator");
const generateToken = require("../../utils/hash.utils");
const login = async (req, res) => {
  try {
    const authToken = generateToken();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ success: false, message: { errors: errors.array() } });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return await res.status(404).json({
        success: false,
        message: "Login gagal!, email tidak di temukan!",
        data: [],
      });
    }
    if (user.token != null || user.token != undefined) {
      return await res.status(403).json({
        success: false,
        message: "Login gagal!, karena telah melakukan login sebelumnya!",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profiles: user.profiles,
          sertifikat: user.sertifikat,
        },
        token: user.token,
      });
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (checkPassword !== true) {
      return await res
        .status(422)
        .json({ success: false, Message: "Password salah!" });
    }
    const assignToken = await User.update(
      { token: authToken },
      {
        where: {
          email: email,
        },
      }
    );
    return await res.status(200).json({
      success: true,
      message: "Login Sukses!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profiles,
        sertifikat: user.sertifikat,
      },
      token: authToken,
    });
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
// const me = async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { token: req.token } });
//     return await res.status(200).json({
//       success: true,
//       message: "Login Sukses!",
//       data: {
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email,
//         role: req.user.role,
//         profile: req.user.profiles,
//         sertifikat: req.user.sertifikat,
//       },
//     });
//   } catch (error) {
//     return await res.status(500).json({
//       message: error?.message || "Server error!",
//     });
//   }
// };
const logout = async (req, res) => {
  try {
    const logout = await User.update(
      { token: null },
      {
        where: {
          token: req.token,
        },
      }
    );
    req.user = [];
    req.token = [];
    return await res.status(200).json({
      success: true,
      message: "Logout berhasil!",
    });
  } catch (error) {
    return await res.status(500).json({
      message: error?.message || "Server error!",
    });
  }
};
const exported_modules = { login, logout };
module.exports = exported_modules;
