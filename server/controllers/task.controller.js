const TaskService = require('../services/user.service');
const response = require('../utils/response')

class TaskController {
  async create(req, res) {
    const result = await TaskService.create(req.body);
    res.status(200).send(response.success(`Task created: ${JSON.stringify(result)}`));
  }

  async getAll(req, res) {
    const result = await TaskService.getAll();
    res.status(200).send(response.success(`All tasks: ${JSON.stringify(result)}`));
  }

  async getOne(req, res) {
    const result = await TaskService.getOne(req.params.taskId);
    res.status(200).send(response.success(`Task data: ${JSON.stringify(result)}`));
  }

  async update(req, res) {
    const result = await TaskService.update(req.params.taskId, req.body);
    res.status(200).send(response.success(`Task updated: ${JSON.stringify(result)}`));
  }

  async delete(req, res) {
    const result = await TaskService.delete(req.params.taskId);
    res.status(200).send(response.success(`Task deleted: ${JSON.stringify(result)}`));
  }
}

module.exports = new TaskController;