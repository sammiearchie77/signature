const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express'); // Assuming your Express express is exported from 'express.js' or similar.
const mongoose = require('mongoose');

const app = express()

const { expect } = chai;

chai.use(chaiHttp);

describe('User Controller', () => {
  before(async () => {
    // Connect to a test database before running tests
    await mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the test database after tests are done
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const newUser = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const res = await chai
      .request(app)
      .post('/api/users')
      .send(newUser);

    expect(res).to.have.status(201);
    expect(res.body.message).to.equal('Successfully signed up!');
  });

  it('should list all users', async () => {
    const res = await chai
      .request(app)
      .get('/api/users');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a user by ID', async () => {
    const newUser = new User({
      firstname: 'Test',
      lastname: 'User',
      email: 'test.user@example.com',
      password: 'testpassword',
    });
    await newUser.save();

    const res = await chai
      .request(app)
      .get(`/api/users/${newUser._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('firstname', 'Test');
    expect(res.body).to.have.property('lastname', 'User');
  });

  // Add more tests for other controller functions (read, searchByUsername, update, remove) as needed.
});
