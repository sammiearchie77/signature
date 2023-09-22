const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../express');
const expect = chai.expect;

chai.use(chaiHttp);

describe('user Routes', () => {
 
  // Define variables for testing data here

  describe('GET /users', () => {
    it('should return a list of users', (done) => {
      chai
        .request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      chai
        .request(app)
        .post('/users')
        .send({ /* Define your request body here */ })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /users/:userId', () => {
    it('should return a specific user', (done) => {
      chai
        .request(app)
        .get('/users/:userId')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /users/:userId', () => {
    it('should update a specific user', (done) => {
      chai
        .request(app)
        .put('/users/:userId')
        .send({ /* Define your request body for updating here */ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /users/:userId', () => {
    it('should delete a specific user', (done) => {
      chai
        .request(app)
        .delete('/users/:userId')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
