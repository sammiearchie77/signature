const Group = require('../models/group.model');
const CustomError = require('../utils/customError');

class GroupService {
    async create(data) {
        return await new Group(data).save();
    }

    async getAll() {
        return await Group.find();
    }

    async getOne(projectId) {
        const group = await Group.findOne({ _id: projectId });
        if (!group) throw new CustomError("Group does not exist")

        return group;
    }

    async update(projectId, data) {
        const group = await Group.findByIdAndUpdate(
            { _id: projectId },
            { $set: data },
            { new: true }
        );
        if (!group) throw new CustomError("Group doesn't exist", 400);

        return group;
    }

    async delete(projectId) {
        const group = await Group.deleteOne({ _id: projectId });
        if (!group) throw new CustomError("Group does not exist")
        return group;
    }
}

module.exports = new GroupService();