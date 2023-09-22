const GroupService = require('../services/group.service');
const response = require('../utils/response')

class GroupController {
  async create(req, res) {
    const result = await GroupService.create(req.body);
    res.status(201).send(response.success(`Group created: ${JSON.stringify(result)}`));
  }

  async getAll(req, res) {
    const result = await GroupService.getAll();
    res.status(200).send(response.success(`All groups: ${JSON.stringify(result)}`));
  }

  async getOne(req, res) {
    const result = await GroupService.getOne(req.params.groupId);
    res.status(200).send(response.success(`Group data: ${JSON.stringify(result)}`));
  }

  async update(req, res) {
    const result = await GroupService.update(req.params.groupId, req.body);
    res.status(200).send(response.success(`Group updated: ${JSON.stringify(result)}`));
  }

  async delete(req, res) {
    const result = await GroupService.delete(req.params.groupId);
    res.status(204).send(response.success(`Group deleted: ${JSON.stringify(result)}`));
  }
}

module.exports = new GroupController;