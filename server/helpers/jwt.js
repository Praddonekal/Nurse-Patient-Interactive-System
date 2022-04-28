let jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
let User = require("mongoose").model("User");

let keys = require("./keys.js");

dotenv.config();

module.exports = async (req, res, next) => {
  const authToken = req.get("Authorization");
  if (!authToken) {
    req.isAuth = false;
    return next();
  }
  const token = authToken.split(" ")[1];
  let verify;
  try {
    verify = jwt.verify(token, keys.public_key);
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!verify._id) {
    req.isAuth = false;
    return next();
  }
  const user = await User.findById(verify._id);
  if (!user) {
    req.isAuth = false;
    return next();
  }
  req.userId = user._id;
  req.isAuth = true;
  next();
};
