// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  priority: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  completed: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);
