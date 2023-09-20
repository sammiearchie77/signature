const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
    },
    status: {
      type: String,
      enum: ['not started', 'in progress', 'completed'],
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("tasks", taskSchema);