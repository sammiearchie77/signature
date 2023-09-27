const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../express');
const expect = chai.expect;

chai.use(chaiHttp);

describe('task Routes', () => {
 
  // Define variables for testing data here

  describe('GET /tasks', () => {
    it('should return a list of tasks', (done) => {
      chai
        .request(app)
        .get('/tasks')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', (done) => {
      chai
        .request(app)
        .post('/tasks')
        .send({ /* Define your request body here */ })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /tasks/:taskId', () => {
    it('should return a specific task', (done) => {
      chai
        .request(app)
        .get('/tasks/:taskId')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('PUT /tasks/:taskId', () => {
    it('should update a specific task', (done) => {
      chai
        .request(app)
        .put('/tasks/:taskId')
        .send({ /* Define your request body for updating here */ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /tasks/:taskId', () => {
    it('should delete a specific task', (done) => {
      chai
        .request(app)
        .delete('/tasks/:taskId')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
