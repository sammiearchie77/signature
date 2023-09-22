const chai = require('chai');
const expect = chai.expect;
const TaskService = require('../services/task.service');

describe('TaskService', () => {
  let createdTaskId;

  describe('create', () => {
    it('should create a new task', async () => {
      // Mock task data for creation
      const taskData = {
        title: 'Sample Task',
        description: 'This is a sample task.',
      };

      try {
        const task = await TaskService.create(taskData);

        // Assert that the task object is created
        expect(task).to.be.an('object');
        expect(task).to.have.property('_id');
        createdTaskId = task._id; // Store the created task's ID for later tests
      } catch (error) {
        // Handle errors
        throw error;
      }
    });
  });

  describe('getAll', () => {
    it('should return a list of tasks', async () => {
      try {
        const tasks = await TaskService.getAll();

        // Assert that the result is an array
        expect(tasks).to.be.an('array');
      } catch (error) {
        // Handle errors
        throw error;
      }
    });
  });

  describe('getOne', () => {
    it('should return a specific task', async () => {
      try {
        const task = await TaskService.getOne(createdTaskId);

        // Assert that the result is an object
        expect(task).to.be.an('object');
        expect(task).to.have.property('_id', createdTaskId);
      } catch (error) {
        // Handle errors
        throw error;
      }
    });

    it('should throw an error for a non-existent task', async () => {
      const nonExistentTaskId = 'nonexistenttaskid';

      try {
        await TaskService.getOne(nonExistentTaskId);
      } catch (error) {
        // Assert that the error message indicates that the task does not exist
        expect(error.message).to.equal('Task does not exist');
      }
    });
  });

  // Add test cases for update and delete methods
});
