const TimetrackerService = require('../services/timetracker.service');
const response = require('../utils/response')

class TimetrackerController {
  async create(req, res) {
    const result = await TimetrackerService.create(req.body);
    res.status(204).send(response.success(`timetracker created: ${JSON.stringify(result)}`));
  }

  async getAll(req, res) {
    const result = await TimetrackerService.getAll();
    res.status(200).send(response.success(`All timetrackers: ${JSON.stringify(result)}`));
  }

  async getOne(req, res) {
    const result = await TimetrackerService.getOne(req.params.timetrackerId);
    res.status(200).send(response.success(`timetracker data: ${JSON.stringify(result)}`));
  }

  async update(req, res) {
    const result = await TimetrackerService.update(req.params.timetrackerId, req.body);
    res.status(200).send(response.success(`timetracker updated: ${JSON.stringify(result)}`));
  }

  async delete(req, res) {
    const result = await TimetrackerService.delete(req.params.projectId);
    res.status(204).send(response.success(`Timetracker deleted: ${JSON.stringify(result)}`));
  }
}

module.exports = new TimetrackerController;