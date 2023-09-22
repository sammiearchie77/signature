const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../express'); // Import your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('Project Routes', () => {
 
  // Define variables for testing data here

  describe('GET /projects', () => {
    it('should return a list of projects', (done) => {
      chai
        .request(app)
        .get('/projects')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /projects', () => {
    it('should create a new project', (done) => {
      chai
        .request(app)
        .post('/projects')
        .send({ /* Define your request body here */ })
        .end((err, res) => {
          expect(res).to.have.status(201); // Adjust status code as needed
          expect(res.body).to.be.an('object'); // Adjust this based on your response structure
          done();
        });
    });
  });

  describe('GET /projects/:projectId', () => {
    it('should return a specific project', (done) => {
      chai
        .request(app)
        .get('/projects/:projectId') // Replace :projectId with an actual project ID
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object'); // Adjust this based on your response structure
          done();
        });
    });
  });

  describe('PUT /projects/:projectId', () => {
    it('should update a specific project', (done) => {
      chai
        .request(app)
        .put('/projects/:projectId')
        .send({ /* Define your request body for updating here */ })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /projects/:projectId', () => {
    it('should delete a specific project', (done) => {
      chai
        .request(app)
        .delete('/projects/:projectId')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
