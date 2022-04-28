// Load the module dependencies:
let mongoose = require("mongoose");
let dotenv = require("dotenv");

dotenv.config();
// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect('mongodb://admin:password@mongodb:27017')
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log(err);
    });

  //Load MongoDB Schemas
  require("../models/user.server.models");
  require("../models/clinicalVisit.server.model");
  require("../models/alert.server.model");
  require("../models/motivationalTips.server.model");
  require("../models/dailyLog.server.model");

  return db;
};
