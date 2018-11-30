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
  describe('comments', function() {
    let test_comment_id;
    const dummy_student_id = 'student_id';
    const dummy_comment = 'I love writing test cases!!1!';
    const dummy_updated_comment = 'I really love writing test cases!!!!';
    after(function(done) {
      request(server)
        .delete(`/${test_class_id}/comment/${test_comment_id}`)
        .expect(200)
        .then(() => {
          request(server)
            .get(`/${test_class_id}/comments`)
            .expect(response =>
              expect(response.body)
                .to.be.an('array')
                .that.does.not.deep.include({
                  id: test_comment_id,
                  Author: dummy_student_id,
                  Comment: dummy_comment
                })
                .and.does.not.deep.include({
                  Comment: dummy_updated_comment
                })
            )
            .expect(200, done);
        });
    });
    describe('creation', function() {
      it('can verify the class exists', function(done) {
        request(server)
          .post(`/invalid_class/comment`)
          .send({
            author: dummy_student_id,
            comment: dummy_comment
          })
          .expect(404, done);
      });
      it('can validate the request body', function(done) {
        request(server)
          .post(`/${test_class_id}/comment`)
          .send({})
          .expect(400, done);
      });
      it('can add a comment', function(done) {
        request(server)
          .post(`/${test_class_id}/comment`)
          .send({
            author: dummy_student_id,
            comment: dummy_comment
          })
          .expect(response => {
            expect(Object.keys(response.body)).to.include('id');
            expect(response.body)
              .to.be.an('object')
              .that.deep.includes({
                Author: dummy_student_id,
                Comment: dummy_comment
              });
            test_comment_id = response.body.id;
          })
          .expect(200, done);
      });
    });
    describe('reading', function() {
      it('can verify the class exists', function(done) {
        request(server)
          .get('/invalid_class/comments')
          .expect(404, done);
      });
      it('can get the comments', function(done) {
        request(server)
          .get(`/${test_class_id}/comments`)
          .expect(response =>
            expect(response.body)
              .to.be.an('array')
              .that.deep.includes({
                id: test_comment_id,
                Author: dummy_student_id,
                Comment: dummy_comment
              })
          )
          .expect(200, done);
      });
    });
    describe('updating', function() {
      it('can verify the class exists', function(done) {
        request(server)
          .patch('/invalid_class/comment/whatever')
          .send({
            comment: dummy_updated_comment
          })
          .expect(404, done);
      });
      it('can veriify the comment exists', function(done) {
        request(server)
          .patch(`/${test_class_id}/comment/invalid_comment`)
          .send({
            comment: dummy_updated_comment
          })
          .expect(404, done);
      });
      it('can validate the request body', function(done) {
        request(server)
          .patch(`/${test_class_id}/comment/${test_comment_id}`)
          .send({})
          .expect(400, done);
      });
      it('can update a comment', function(done) {
        request(server)
          .patch(`/${test_class_id}/comment/${test_comment_id}`)
          .send({
            comment: dummy_updated_comment
          })
          .expect(200)
          .then(() => {
            request(server)
              .get(`/${test_class_id}/comments`)
              .expect(response =>
                expect(response.body)
                  .to.be.an('array')
                  .that.deep.includes({
                    id: test_comment_id,
                    Author: dummy_student_id,
                    Comment: dummy_updated_comment
                  })
              )
              .expect(200, done);
          });
      });
    });
    describe('deletion', function(done) {
      it('can verify the class exists', function(done) {
        request(server)
          .delete('/invalid_class/comment/whatever')
          .expect(404, done);
      });
      it('can verify the comment exists', function(done) {
        request(server)
          .delete(`/${test_class_id}/comment/invalid_comment`)
          .expect(404, done);
      });
    });
  });
});
