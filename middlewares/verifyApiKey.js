// check if routes using api keys ()
require("dotenv").config();
module.exports = async (req, res, next) => {
  const api_key = req.headers.api_key;
  if (api_key) {
    if (api_key !== process.env.API_KEY) {
      return res
        .status(401)
        .json({ success: false, message: "Uknown API key!" });
    }
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "API key header is missing!",
    });
  }
};
