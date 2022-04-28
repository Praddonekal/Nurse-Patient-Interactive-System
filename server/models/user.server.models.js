let mongoose = require("mongoose");
let { Schema } = mongoose;
let passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require("bcrypt-nodejs");

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
      validate: [
        (password) => password && password.length >= 6,
        "Password length should be at least 6",
      ],
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", userSchema);
