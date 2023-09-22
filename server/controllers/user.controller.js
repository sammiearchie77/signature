const UserService = require('../services/user.service');
const response = require('../utils/response')

class UserController {
  async create(req, res) {
    const result = await UserService.create(req.body);
    res.status(201).send(response.success(`User created: ${JSON.stringify(result)}`));
  }

  async getAll(req, res) {
    const result = await UserService.getAll();
    res.status(200).send(response.success(`All users: ${JSON.stringify(result)}`));
  }

  async getOne(req, res) {
    const result = await UserService.getOne(req.params.userId);
    res.status(200).send(response.success(`User data: ${JSON.stringify(result)}`));
  }

  async update(req, res) {
    const result = await UserService.update(req.params.userId, req.body);
    res.status(200).send(response.success(`User updated: ${JSON.stringify(result)}`));
  }

  async delete(req, res) {
    const result = await UserService.delete(req.params.userId);
    res.status(204).send(response.success(`User deleted: ${JSON.stringify(result)}`));
  }
}

module.exports = new UserController;