require("dotenv").config();
const md5 = require("js-md5");
const d = new Date();
var uuid = require("uuid-random");
const hashRoundDate = Math.floor(Date.now() / 1000);
module.exports = () => {
  const separator = ["$=", ".!=="];
  const hash =
    md5(
      md5.base64(`${uuid()}.${hashRoundDate}.${process.env.HASH_KEY}`)
    ).substring(0, 12) +
    "." +
    md5(`${uuid()}.${hashRoundDate}.${process.env.HASH_KEY}`).substring(0, 15) +
    "." +
    md5(
      md5.base64(`${uuid()}.${hashRoundDate}.${process.env.HASH_KEY}`)
    ).substring(0, 12);
  return (separator[0] + hash + separator[1]).toLowerCase();
};
