const chai = require('chai');
const expect = chai.expect;
const AuthService = require('../../services/auth.service');

describe('AuthService', () => {
  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      // Mock user data for signup
      const userData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com',
        password: 'securePassword',
        role: 'user',
      };

      try {
        const result = await AuthService.signup(userData);

        // Assert that the result contains necessary properties
        expect(result).to.have.property('uid');
        expect(result).to.have.property('firstname');
        expect(result).to.have.property('lastname');
        expect(result).to.have.property('email');
        expect(result).to.have.property('role');
        expect(result).to.have.property('token');
      } catch (error) {
        // Handle errors
        throw error;
      }
    });
  });

  describe('signin', () => {
    it('should sign in a user and return a token', async () => {
      // Mock user data for signin
      const userData = {
        email: 'johndoe@example.com',
        password: 'securePassword',
      };

      try {
        const result = await AuthService.signin(userData);

        // Assert that the result contains necessary properties
        expect(result).to.have.property('uid');
        expect(result).to.have.property('firstname');
        expect(result).to.have.property('lastname');
        expect(result).to.have.property('email');
        expect(result).to.have.property('role');
        expect(result).to.have.property('verified');
        expect(result).to.have.property('token');
      } catch (error) {
        // Handle errors
        throw error;
      }
    });
  });

  // Add more test cases for other AuthService methods here
});
