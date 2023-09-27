const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeTrackerSchema = new Schema(
    {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'tasks' },
        projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'projects'},
        startTime: Date,
        endTime: Date,
        duration: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("timetrackers", timeTrackerSchema);