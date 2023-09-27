const Project = require('../models/project.model');
const CustomError = require('../utils/customError');

class ProjectService {
    async create(data) {
        return await new Project(data).save();
    }

    async getAll() {
        return await Project.find();
    }

    async getOne(projectId) {
        const project = await Project.findOne({ _id: projectId });
        if (!project) throw new CustomError("Project does not exist")

        return project;
    }

    async update(projectId, data) {
        const project = await Project.findByIdAndUpdate(
            { _id: projectId },
            { $set: data },
            { new: true }
        );
        if (!project) throw new CustomError("Project doesn't exist", 400);

        return project;
    }

    async delete(projectId) {
        const project = await Project.deleteOne({ _id: projectId });
        if (!project) throw new CustomError("Project does not exist")
        return project;
    }
}

module.exports = new ProjectService();