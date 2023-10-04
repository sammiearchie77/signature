const GroupService = require('../services/group.service');
const response = require('../utils/response')

class GroupController {
  async create(req, res) {
    try {
      const result = await GroupService.create(req.body);
    res.status(201).send(response.success(`Group created: ${JSON.stringify(result)}`));
    } catch(err) {
      res.status(500).send(response.error(`Error creating group: ${JSON.stringify(result)}`));
    }
  }

  async getAll(req, res) {
    try {
      const result = await GroupService.getAll();
    res.status(200).send(response.success(`All groups: ${JSON.stringify(result)}`));
    } catch(err) {
      res.status(500).send(response.error(`Error getting all group: ${JSON.stringify(result)}`));
    }
  }

  async getOne(req, res) {
    try {
      const result = await GroupService.getOne(req.params.groupId);
    res.status(200).send(response.success(`Group data: ${JSON.stringify(result)}`));
    } catch(err) {
      res.status(500).send(response.error(`Error getting group: ${JSON.stringify(result)}`));
    }
  }

  async update(req, res) {
    try {
      const result = await GroupService.update(req.params.groupId, req.body);
    res.status(200).send(response.success(`Group updated: ${JSON.stringify(result)}`));
    } catch(err) {
      res.status(500).send(response.error(`Error update group: ${JSON.stringify(result)}`));
    }
  }

  async delete(req, res) {
    try {
      const result = await GroupService.delete(req.params.groupId);
    res.status(204).send(response.success(`Group deleted: ${JSON.stringify(result)}`));
    } catch(err) {
      res.status(500).send(response.error(`Error deleting group: ${JSON.stringify(result)}`));
    }
  }
}

module.exports = new GroupController;