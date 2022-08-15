const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const monitorLogSchema = new Schema({
  url: {
    type: mongoose.Schema.Types.ObjectId,
  },
  res_status: {
    type: String,
  },
  response: {
    type: String,
  },
  res_limit: {
    type: Number,
    default: 200
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});


module.exports.MonitorLog = mongoose.model("MonitorLog", monitorLogSchema);