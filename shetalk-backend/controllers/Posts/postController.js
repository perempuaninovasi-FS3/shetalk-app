const slug = require("slug");
const { Post, Topic, User, Avatar } = require("../../database/models/");
const { jsonResponse } = require("../../utils/response.utils");
const hashMake = require("../../utils/hash.utils");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const md5 = require("js-md5");
const index = async (req, res) => {
  try {
    let { page = 1, size = 10, title } = req.query;
    const whereClause = title ? { title: { [Op.like]: `%${title}%` } } : {};
    page = parseInt(page) || 1;
    size = parseInt(size) || 10;
    const offset = (page - 1) * size;
    const limit = size;
    const { count, rows: posts } = await Post.findAndCountAll({
      attributes: [
        "id",
        "title",
        "slug",
        "description",
        "createdAt",
        "updatedAt",
      ],
      include: [
        { model: Topic, as: "topic" },
        { model: Avatar, as: "avatar" },
        {
          model: User,
          as: "user",
          required: false,
          attributes: [
            "id",
            "name",
            "profile",
            "role",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
      where: whereClause,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });
    const totalPages = Math.ceil(count / size);
    return await jsonResponse(res, {
      status: 200,
      message: "Data posts berhasil di dapatkan!",
      success: true,
      data: posts,
      otherAttr: {
        paginate: {
          totalItems: count,
          perPageSizes: parseInt(size),
          totalPages: totalPages,
          currentPage: parseInt(page),
        },
      },
    });
    // return res.status(200).json({
    //   success: true,
    //   message: "Data posts berhasil didapatkan!",
    //   data: posts,
    //   totalItems: count,
    //   totalPages: totalPages,
    //   currentPage: parseInt(page),
    // });
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const get = async (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  const posts = await Post.findOne({
    attributes: [
      "id",
      "title",
      "slug",
      "description",
      "createdAt",
      "updatedAt",
    ],
    where: {
      slug: slug,
    },
    include: [
      { model: Topic, as: "topic" },
      { model: Avatar, as: "avatar" },
      {
        model: User,
        as: "user",
        required: false,
        attributes: ["id", "name", "profile", "role", "createdAt", "updatedAt"],
      },
    ],
  });
  return await jsonResponse(res, {
    status: 200,
    message: "Data posts berhasil di dapatkan!",
    success: true,
    data: posts,
  });
};

const create_new_post = async (req, res) => {
  try {
    const { title, description, topic_id } = req.body;
    var avatar_id = null;
    var user_id = null;
    const errors = validationResult(req);
    const topics = await Topic.findOne({ where: { id: topic_id } });
    if (topics === null) {
      return await res.status(404).json({
        success: false,
        message: "Data dari tema topik tidak ditemukan!",
      });
    }
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ success: false, message: { errors: errors.array() } });
    }
    avatar_id = req.body?.avatar_id || req.headers?.avatar_id;

    if (
      req.body.hasOwnProperty("avatar_id") ||
      req.headers.hasOwnProperty("avatar_id")
    ) {
      const avatars = await Avatar.findOne({ where: { id: avatar_id } });
      if (avatars === null) {
        return await res.status(404).json({
          success: false,
          message: "Avatar tidak ditemukan!",
        });
      }
    }
    if (req.user) {
      user_id = req.user.id;
    }
    const data = {
      title: title,
      slug: slug(`${title} ${md5(hashMake()).substring(0, 6)}`),
      description: description,
      topic_id: topic_id,
      user_id: user_id,
      avatar_id: avatar_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const posts = Post.create(data);
    if (posts) {
      return await res.status(200).json({
        success: true,
        message: "Berhasil membuat postingan baru!",
      });
    }
  } catch (error) {
    return await res.status(500).json({
      success: false,
      message: error?.message || "Server error!",
    });
  }
};
const get_user_posts = async (req, res) => {
  try {
    const userId = req.user.id;
    const userPosts = await Post.findAll({
      where: {
        user_id: userId,
      },
    });
    return jsonResponse(res, {
      status: 200,
      message: "Data postingan pengguna berhasil didapatkan!",
      success: true,
      data: userPosts,
    });
  } catch (error) {
    return jsonResponse(res, {
      status: 500,
      message: error.message || "Server error!",
      success: false,
    });
  }
};
const exported_modules = { index, get, create_new_post, get_user_posts };
module.exports = exported_modules;
