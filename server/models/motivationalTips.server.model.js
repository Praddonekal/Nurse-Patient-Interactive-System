const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotivationalTipsSchema = new Schema({
  type: String,
  tip: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

MotivationalTipsSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("MotivationalTips", MotivationalTipsSchema);
