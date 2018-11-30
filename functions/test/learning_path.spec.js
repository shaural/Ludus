const request = require('supertest');
const { expect } = require('chai');

const endfn = (done) => (err, res) => {
  if (err) return done(err);
  done();
};

describe('testing learning paths', function() {
  let server;
  const test_lp_id = '-LSWz0JGlvEvzhTBhQQ6';
  before(function() {
    server = require('../learning_path').route;
  });
  after(function(done) {
    request(server).delete(`/${test_lp_id}/class/2`).expect(200).then(() => {
      request(server)
        .get(`/${test_lp_id}/classes`)
        .expect((response) => expect(response.body).to.be.an('array').that.does.not.include('dummy_id'))
        .expect(200, done);
    });
  });
  describe('population', function() {
    it('can validate the learning path', function(done) {
      request(server)
        .post(`/invalid_lp_id/class`)
        .send({
          index: 1,
          class_id: 'dummy_id'
        })
        .expect(404, done);
    });
    it('can handle no data', function(done) {
      request(server).post(`/${test_lp_id}/class`).send({}).expect(400, done);
    });
    it('can handle partial data', function(done) {
      request(server)
        .post(`/${test_lp_id}/class`)
        .send({
          index: 1
        })
        .expect(400, done);
    });
    it('can validate the given index', function(done) {
      request(server)
        .post(`/${test_lp_id}/class`)
        .send({
          index: -1,
          class_id: 'dummy_id'
        })
        .expect(400, done);
    });
    it('can check whether the given index is available', function(done) {
      request(server)
        .post(`/${test_lp_id}/class`)
        .send({
          index: 0,
          class_id: 'dummy_id'
        })
        .expect(400, done);
    });
    it('can add a class', function(done) {
      request(server)
        .post(`/${test_lp_id}/class`)
        .send({
          index: '2',
          class_id: 'dummy_id'
        })
        .expect(200, done);
    });
  });
  describe('retrieval', function() {
    it('can get existing classes', function(done) {
      request(server)
        .get(`/${test_lp_id}/classes`)
        .expect((response) => expect(response.body).to.be.an('array').that.includes('dummy_id'))
        .expect(200, done);
    });
    it('can get the next class by index', function(done) {
      request(server)
        .get(`/${test_lp_id}/nextClassByIndex/1`)
        .expect((response) => expect(response.body).to.be.a('string').that.equals('dummy_id'))
        .expect(200, done);
    });
  });
  describe('updating', function() {
    it('can update a learning path', function(done) {
      const n = Math.random() * 100;
      request(server)
        .patch(`/${test_lp_id}`)
        .send({ topic: `life skills * ${n}` })
        .expect((response) => {
          expect(response.body).to.be.an('object').that.deep.includes({ Topic: `life skills * ${n}` });
        })
        .expect(200, done);
    });
  });
});
