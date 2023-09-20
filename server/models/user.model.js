const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Group = require('../models/group.model')
const Task = require('../models/task.model')
const Project = require('../models/project.model')
const bcrypt = require("bcrypt");
const config = require("../config/env");

let env = process.env.NODE_ENV || 'development';
const bcryptSalt = config.development.bcryptSalt

const userSchema = new Schema(
  {
    firstname: { type: String, trim: true, required: [true, "Firstname is required"] },
    lastname: { type: String, trim: true, required: [true, "Lastname is required"] },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: { type: String },
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;

  next();
});

// Middleware to cascade delete related data
userSchema.pre('remove', async function (next) {
  const userId = this._id;

  try {
    // Delete related tasks
    await Task.deleteMany({ user: userId });
    // Delete related projects
    await Project.deleteMany({ user: userId });
    // Delete groups where the user is a member
    await Group.updateMany({}, { $pull: { members: userId } });
    // Continue with user deletion
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("users", userSchema);