const chai = require('chai');
const sinon = require('sinon');
const UserService = require('../../services/user.service');
const User = require('../../models/user.model');
const CustomError = require('../../utils/customError');

const should = chai.should();

describe('UserService', () => {
  // Create a spy for the User model's methods
  const UserModel = {
    create: sinon.spy(),
    find: sinon.spy(),
    findOne: sinon.spy(),
    findByIdAndUpdate: sinon.spy(),
  };

  // Stub the User model to use the spy methods
  before(() => {
    sinon.stub(User, 'create').callsFake(UserModel.create);
    sinon.stub(User, 'find').callsFake(UserModel.find);
    sinon.stub(User, 'findOne').callsFake(UserModel.findOne);
    sinon.stub(User, 'findByIdAndUpdate').callsFake(UserModel.findByIdAndUpdate);
  });

  // Restore the original methods after testing
  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = { /* test data */ };

      // Stub the create method to return a predefined user
      UserModel.create.resolves(userData);

      const result = await UserService.create(userData);

      result.should.deep.equal(userData);
      UserModel.create.calledOnce.should.be.true;
    });
  });

  describe('getAll', () => {
    it('should get all users', async () => {
      const users = [{ /* user 1 data */ }, { /* user 2 data */ }];

      // Stub the find method to return the list of users
      UserModel.find.resolves(users);

      const result = await UserService.getAll();

      result.should.deep.equal(users);
      UserModel.find.calledOnce.should.be.true;
    });
  });

  describe('getOne', () => {
    it('should get a user by ID', async () => {
      const userId = '123';
      const userData = { /* user data */ };

      // Stub the findOne method to return the user data
      UserModel.findOne.resolves(userData);

      const result = await UserService.getOne(userId);

      result.should.deep.equal(userData);
      UserModel.findOne.calledOnce.should.be.true;
    });

    it('should throw an error if the user does not exist', async () => {
      const userId = 'invalid-id';

      // Stub the findOne method to return null (user not found)
      UserModel.findOne.resolves(null);

      try {
        await UserService.getOne(userId);
      } catch (error) {
        error.should.be.an.instanceOf(CustomError);
        error.message.should.equal('User does not exist');
        UserModel.findOne.calledOnce.should.be.true;
      }
    });
  });

  // Similar test cases for update and delete methods
});
