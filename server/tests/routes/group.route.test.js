const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../express');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Group Routes', () => {
 
  // Define variables for testing data here

  describe('GET /groups', () => {
    it('should return a list of groups', (done) => {
      chai
        .request(app)
        .get('/groups')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /groups', () => {
    it('should create a new group', (done) => {
      chai
        .request(app)
        .post('/groups')
        .send({ /* Define your request body here */ })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /groups/:groupId', () => {
    it('should return a specific group', (done) => {
      chai
        .request(app)
        .get('/groups/:groupId')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /groups/:groupId', () => {
    it('should update a specific group', (done) => {
      chai
        .request(app)
        .put('/groups/:groupId')
        .send({ /* Define your request body for updating here */ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /groups/:groupId', () => {
    it('should delete a specific group', (done) => {
      chai
        .request(app)
        .delete('/groups/:groupId')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
