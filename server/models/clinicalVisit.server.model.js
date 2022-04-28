const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClinicalVisitSchema = new Schema({
  bodyTemperature: Number,
  heartRate: Number,
  bloodPressure: String,
  respiratoryRate: Number,
  nurse: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

ClinicalVisitSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("ClinicalVisit", ClinicalVisitSchema);
