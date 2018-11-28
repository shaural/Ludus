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
  after(function(done) {
    request(server)
      .delete(`/${test_class_id}`)
      .expect(200)
      .then(() => {
        request(server)
          .delete(`/${test_class_id}`)
          .expect(404, done);
      });
  });

  describe('creation', function() {
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
          owner: '-LNVWR9kD2dvN8GLGFYE',
          content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          test_class_id = res.body.id;
          done();
        });
    });
    it('can get classes by owner', function(done) {
      request(server)
        .get('/classlist/-LNVWR9kD2dvN8GLGFYE')
        .expect(response =>
          expect(response.body)
            .to.be.an('object')
            .that.deep.includes({
              [test_class_id]: {
                Mature: 'no',
                Name: 'test class!',
                Owner: '-LNVWR9kD2dvN8GLGFYE',
                content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
              }
            })
        )
        .expect(200, done);
    });
  });
  describe('info', function() {
    it('can validate a class', function(done) {
      request(server)
        .get('/invalid_class/info')
        .expect(404, done);
    });
    it('can get class info', function(done) {
      request(server)
        .get(`/${test_class_id}/info`)
        .expect(200, done);
    });
  });
});
