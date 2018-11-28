const request = require('supertest');
const { expect } = require('chai');

const endfn = done => (err, res) => {
  if (err) return done(err);
  done();
};

describe('testing classes', function() {
  let test_class_id;
  let server;
  before(function() {
    server = require('../classes').route;
  });
  it('can validate new class information before creating', function(done) {
    request(server)
      .post('/')
      .send({})
      .expect(400)
      .end(endfn(done));
  });
  it('can create a new class', function(done) {
    request(server)
      .post('/')
      .send({
        name: 'test class!',
        owner: '-LNVWR9kD2dvN8GLGFYE'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        test_class_id = res.body.id;
        done();
      });
  });
});
