const { Post, Comment, User } = require("../../database/models");
const { jsonResponse } = require("../../utils/response.utils");
const { validationResult } = require("express-validator");

const get_comment = async (req, res) => {
  const { post_id } = req.query;
  const post = await Post.findOne({ where: { id: post_id } });
  // console.log(post);
  if (!post_id || !post) {
    return await jsonResponse(res, {
      status: 404,
      success: false,
      message: "Postingan tidak ditemukan!",
      data: [],
    });
  }
  const { page = 1, size = 10 } = req.query;
  const offset = (page - 1) * size;
  const limit = size;
  const { count, rows: comments } = await Comment.findAndCountAll({
    where: { post_id: post_id },
    attributes: ["id", "comment", "createdAt", "updatedAt"],
    include: [
      {
        model: User,
        as: "user",
        required: false,
        attributes: [
          "id",
          "name",
          "profiles",
          "role",
          "createdAt",
          "updatedAt",
        ],
      },
    ],
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [["createdAt", "DESC"]],
  });
  const totalPages = Math.ceil(count / size);
  return await jsonResponse(res, {
    status: 200,
    message: "Komentar berhasil di dapatkan!",
    success: true,
    data: { posts: post, comments: comments },
    otherAttr: {
      paginate: {
        totalItems: count,
        perPageSizes: parseInt(size),
        totalPages: totalPages,
        currentPage: parseInt(page),
      },
    },
  });
};
const create_new_comment = async (req, res) => {
  const { post_id } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, message: { errors: errors.array() } });
  }

  if (!post_id) {
    return await jsonResponse(res, {
      status: 404,
      success: false,
      message: "Komentar tidak ditemukan!",
      data: [],
    });
  }

  // Active this
  const post = await Post.findOne({
    where: { id: post_id, user_id: req.user.id },
  });
  if (post) {
    return await jsonResponse(res, {
      status: 403,
      success: false,
      message: "Komentar tidak diizinkan di postingan milik sendiri!",
      data: [],
    });
  }
  
};
const delete_comment = async (req, res) => {};
const edit_comment = async (req, res) => {};
const exported_modules = {
  get_comment,
  create_new_comment,
  delete_comment,
  edit_comment,
};
module.exports = exported_modules;
