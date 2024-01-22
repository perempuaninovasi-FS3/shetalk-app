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
    if (user.token != null || user.token != undefined) {
      return res.status(403).json({
        success: false,
        message: "Login gagal!, karena telah melakukan login sebelumnya!",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profiles,
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
const user_info = async (req, res) => {};
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
const exported_modules = { login, user_info, logout };
module.exports = exported_modules;
