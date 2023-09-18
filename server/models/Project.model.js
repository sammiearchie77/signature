const mongoose = require("mongoose");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    title: String,
    description: String,
    team: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updated: Date
  })
);


module.exports = Project;