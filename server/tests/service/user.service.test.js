const chai = require('chai');
const expect = chai.expect;
const UserService = require('../../services/user.service');

describe('UserService', () => {
  let createdUserId;

  describe('create', () => {
    it('should create a new user', async () => {
      // Mock user data for creation
      const userData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        password: 'securePassword',
      };

      try {
        const user = await UserService.create(userData);

        // Assert that the user object is created
        expect(user).to.be.an('object');
        expect(user).to.have.property('_id');
        createdUserId = user._id; // Store the created user's ID for later tests
      } catch (error) {
        // Handle errors
        throw error;
      }
    });
  });

  describe('getAll', () => {
    it('should return a list of users', async () => {
      try {
        const users = await UserService.getAll();

        // Assert that the result is an array
        expect(users).to.be.an('array');
      } catch (error) {
        // Handle errors
        throw error;
      }
    });
  });

  describe('getOne', () => {
    it('should return a specific user', async () => {
      try {
        const user = await UserService.getOne(createdUserId);

        // Assert that the result is an object
        expect(user).to.be.an('object');
        expect(user).to.have.property('_id', createdUserId);
      } catch (error) {
        // Handle errors
        throw error;
      }
    });

    it('should throw an error for a non-existent user', async () => {
      const nonExistentUserId = 'nonexistentuserid';

      try {
        await UserService.getOne(nonExistentUserId);
      } catch (error) {
        // Assert that the error message indicates that the user does not exist
        expect(error.message).to.equal('User does not exist');
      }
    });
  });

  // Add test cases for update and delete methods
});
