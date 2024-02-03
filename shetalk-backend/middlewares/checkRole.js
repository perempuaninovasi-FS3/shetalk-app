module.exports = function checkRole(allowedRoles) {
  return async (req, res, next) => {
    const userRoles = req.user.role;

    // Convert allowedRoles to an array
    const rolesToCheck = Array.isArray(allowedRoles)
      ? allowedRoles
      : allowedRoles.split(",");

    const hasPermission = rolesToCheck.some((role) =>
      userRoles.includes(role.trim())
    );
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
