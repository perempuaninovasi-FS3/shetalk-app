module.exports = function checkRole(allowedRoles) {
  return async (req, res, next) => {
    const userRoles = req.user.role;
    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));
    if (hasPermission) {
      console.log("Akses di dapatkan!");
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Akses tidak diizinkan!",
      });
    }
  };
};
