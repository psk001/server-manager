const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default:'active',
  },
  projects: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }]
  }
});

userSchema.methods.generateAuthToken = function () {
  const JWT_SECRET = process.env["JWT_SECRET"];

  const token = jwt.sign(
    {
      user_id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    },
    JWT_SECRET
  );
  return token;
};

module.exports.User = mongoose.model("User", userSchema);