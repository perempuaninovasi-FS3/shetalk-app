const { body, validationResult } = require("express-validator");
exports.userValidator = (method) => {
  if (method == "login") {
    return [
      body("email", "Email tidak boleh kosong!").not().isEmpty(),
      body("password", "password tidak boleh kosong!").not().isEmpty(),
      body("password", "Password minimal 6 karakter!").isLength({
        min: 6,
      }),
    ];
  }
};
