const request = require('request');
const { describe, it } = require('mocha');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const config = require('../config/env');


describe('Server rendering index', () => {
    const options = {
      url: config.development.url.api,
      method: "GET"
    }

    it('check correct status code', (done) => {
      request(options, (err, res, body) => {
        expect(body).to.contain('Hello Server...');
        expect(res.statusCode).to.equal(200)
        done();
      })
    });
});
