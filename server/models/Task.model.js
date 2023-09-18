const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
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


module.exports = Task;