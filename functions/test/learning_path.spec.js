const request = require('supertest');
const { expect } = require('chai');

const endfn = done => (err, res) => {
  if (err) return done(err);
  done();
};

describe('testing learning paths', function() {});
