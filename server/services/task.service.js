const Task = require('../models/task.model');
const CustomError = require('../utils/customError');

class TaskService {
    async create(data) {
        return await new Task(data).save();
    }

    async getAll() {
        return await Task.find();
    }

    async getOne(taskId) {
        const task = await Task.findOne({ _id: taskId });
        if (!task) throw new CustomError("Task does not exist")

        return task;
    }

    async update(taskId, data) {
        const task = await Task.findByIdAndUpdate(
            { _id: taskId },
            { $set: data },
            { new: true }
        );
        if (!task) throw new CustomError("Task doesn't exist", 400);

        return task;
    }

    async delete(taskId) {
        const task = await Task.deleteOne({ _id: taskId });
        if (!task) throw new CustomError("Task does not exist")
        return task;
    }
}

module.exports = new TaskService();