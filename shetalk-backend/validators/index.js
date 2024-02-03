const { body, validationResult } = require("express-validator");
exports.userValidator = (method) => {
  if (method == "login") {
    return [
      body("email", "Email tidak boleh kosong!").not().isEmpty(),
      body("password", "Password tidak boleh kosong!").not().isEmpty(),
      body("password", "Password minimal 6 karakter!").isLength({
        min: 6,
      }),
    ];
  }
  if (method == "edit_user") {
    return [
      body("email", "Email tidak boleh kosong!").not().isEmpty(),
      body("name", "Nama tidak boleh kosong!").not().isEmpty(),
    ];
  }
};
exports.postValidator = (method) => {
  if (method == "create") {
    return [
      body("title", "Title tidak boleh kosong!").not().isEmpty(),
      body("topic_id", "Topik tidak boleh kosong!").not().isEmpty(),
    ];
  }
};

exports.commentValidator = (method) => {
  if (method == "create") {
    return [body("comment", "Komentar tidak boleh kosong!").not().isEmpty()];
  }
};
