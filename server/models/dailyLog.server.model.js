const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyLogSchema = new Schema({
  bodyTemperature: String,
  pulse: String,
  bloodPressure: String,
  respiratoryRate: String,
  nurse: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  weight: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

DailyLogSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("DailyLogSchema", DailyLogSchema);
