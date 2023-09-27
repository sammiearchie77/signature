const TimeTracker = require('../models/timeTracker.model');
const CustomError = require('../utils/customError');

class TimeTrackerService {
    async create(data) {
        return await new TimeTracker(data).save();
    }

    async getAll() {
        return await TimeTracker.find();
    }

    async getOne(timeTrackerId) {
        const timetracker = await TimeTracker.findOne({ _id: timeTrackerId });
        if (!timetracker) throw new CustomError("TimeTracker does not exist")

        return timetracker;
    }

    async update(timeTrackerId, data) {
        const timetracker = await TimeTracker.findByIdAndUpdate(
            { _id: timeTrackerId },
            { $set: data },
            { new: true }
        );
        if (!timetracker) throw new CustomError("TimeTracker doesn't exist", 400);

        return timetracker;
    }

    async delete(timeTrackerId) {
        const timetracker = await TimeTracker.deleteOne({ _id: timeTrackerId });
        if (!timetracker) throw new CustomError("TimeTracker does not exist")
        return timetracker;
    }
}

module.exports = new TimeTrackerService();