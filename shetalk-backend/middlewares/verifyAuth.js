require("dotenv").config();
const { User, Comment } = require("../database/models/");
module.exports = async (req, res, next) => {
  req.token = [];
  req.user = [];
  var token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      token = token.trim();
      const user = await User.findOne({
        where: { token: token },
        include: [{ model: Comment, as: "comments" }],
      });
      if (!user) {
        // User not found
        return res.status(401).json({
          success: false,
          message: "Uknown user token!",
        });
      }
      var data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profiles: user.profiles,
        sertifikat: user.sertifikat,
        total_answered: user.total_answered,
      };
      req.token = token;
      req.user = data;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error?.message || "Server error!",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing!",
    });
  }
};
