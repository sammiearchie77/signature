const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", projectSchema);