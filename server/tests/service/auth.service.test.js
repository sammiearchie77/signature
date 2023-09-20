const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should(); // Enable should-style syntax
const sinon = require('sinon');
const AuthController = require('../../controllers/auth.controller');
const AuthService = require('../../services/auth.service');
const response = require('../../utils/response');

chai.use(chaiHttp);

describe('AuthController', () => {
  // Mock AuthService methods to isolate controller tests
  before(() => {
    sinon.stub(AuthService, 'signup').resolves({ userId: '123' });
    sinon.stub(AuthService, 'signin').resolves({ userId: '123' });
    sinon.stub(AuthService, 'updatePassword').resolves({ message: 'Password updated' });
    sinon.stub(AuthService, 'RequestEmailVerification').resolves('Verification link sent');
    sinon.stub(AuthService, 'VerifyEmail').resolves({ message: 'Email verified' });
    sinon.stub(AuthService, 'RequestPasswordReset').resolves('Password reset link sent');
    sinon.stub(AuthService, 'resetPassword').resolves({ message: 'Password updated' });
  });

  after(() => {
    // Restore AuthService methods
    sinon.restore();
  });

  describe('signup', () => {
    it('should create a new user and return success response', async () => {
      const req = { body: { /* user data */ } };
      const res = {
        status: (statusCode) => {
          statusCode.should.equal(201);
          return res;
        },
        send: (data) => {
          // Add your assertions for the response here
          data.should.include('User successfully created');
        },
      };

      await AuthController.signup(req, res);
    });
  });

  // Similar test cases for other AuthController methods (signin, updatePassword, etc.)
});
