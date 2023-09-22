const chai = require('chai');
const sinon = require('sinon');
const AuthController = require('../../controllers/auth.controller');
const AuthService = require('../../services/auth.service');
const CustomError = require('../../utils/customError');

const should = chai.should();

const data = 
  {
    firstname: "Samuel",
    lastname: "Chinonso",
    email: "archiechiso@gmail.com",
    password: "Graceland!"
  };

describe('AuthController', () => {
  describe('signup', () => {
    it('should create a new user and return success response', async () => {
      const req = { body: data };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
      };

      // Mock the AuthService.signup method
      sinon.stub(AuthService, 'signup').resolves(data);

      await AuthController.signup(req, res);

      // Assertions
      res.status.calledWith(201).should.be.true;
      res.send.calledWith(sinon.match(/User successfully created/)).should.be.true;

      // Restore the AuthService.signup method
      AuthService.signup.restore();
    });

    it('should handle signup failure and return an error response', async () => {
      const req = { body: data };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
      };

      // Mock the AuthService.signup method to simulate failure
      sinon.stub(AuthService, 'signup').rejects(new CustomError('Signup failed', 400));

      await AuthController.signup(req, res);

      // Assertions
      res.status.calledWith(400).should.be.true;
      res.send.calledWith(sinon.match(/Signup failed/)).should.be.true;

      // Restore the AuthService.signup method
      AuthService.signup.restore();
    });
  });

  // Similar test cases for other AuthController methods (signin, updatePassword, etc.)
});
