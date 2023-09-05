const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Replace with the actual path to your Express.js app
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Registration Route', () => {
  it('should register a new user', (done) => {
    chai
      .request(app)
      .post('/auth/sign-up')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Registration successful');
        done();
      });
  });

  it('should return an error for invalid registration', (done) => {
    chai
      .request(app)
      .post('/auth/sign-up')
      .send({ email: 'test@example.com', password: 'short' }) // Invalid password
      .end((err, res) => {
        expect(res).to.have.status(500); // Adjust the status code based on your error handling
        expect(res.body).to.have.property('error');
        done();
      });
  });
});


/**
 * Sign in route
 */

describe('User Login Route', () => {
    it('should login a registered user', (done) => {
      chai
        .request(app)
        .post('/auth/sign-in')
        .send({ email: 'test@example.com', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Login successful');
          done();
        });
    });
  
    it('should return an error for invalid login', (done) => {
      chai
        .request(app)
        .post('/auth/sign-in')
        .send({ email: 'test@example.com', password: 'wrongpassword' }) // Invalid password
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').equal('Unauthorized');
          done();
        });
    });
  });
  