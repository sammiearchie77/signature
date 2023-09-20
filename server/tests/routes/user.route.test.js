const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./express'); // Replace with the path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe('Authentication Routes', () => {
  describe('POST /signup', () => {
    it('should create a new user', (done) => {
      chai
        .request(app)
        .post('/signup')
        .send({
          nfirstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@example.com',
          password: 'securepassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          // Add more assertions to validate the response or user creation
          done();
        });
    });
  });

  describe('POST /signin', () => {
    it('should authenticate a user', (done) => {
      chai
        .request(app)
        .post('/signin')
        .send({
          email: 'johndoe@example.com',
          password: 'securepassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          // Add more assertions to validate the response or user authentication
          done();
        });
    });
  });

  // Add similar test cases for other routes (e.g., /request-email-verification, /verify-email, etc.)
});
