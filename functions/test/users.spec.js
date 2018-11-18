const request = require('supertest');
const { expect } = require('chai');

const endfn = done => (err, res) => {
  if (err) return done(err);
  done();
};

describe('testing users', function() {
  var _test_user_id;
  let server;
  before(function() {
    server = require('../users').route;
  });
  after(function(done) {
    request(server)
      .delete(`/${_test_user_id}`)
      .expect(200)
      .then(() => {
        request(server)
          .get(`/${_test_user_id}`)
          .expect(404, done);
      });
  });

  //this.timeout(5000);

  describe('top-level user', function() {
    var test_user_id;
    after(function() {
      _test_user_id = test_user_id;
    });

    it('can get all user records', function(done) {
      request(server)
        .get('/')
        .expect(response => expect(Object.keys(response).length).to.be.gt(0))
        .expect(200)
        .end(endfn(done));
    });
    it('can validate new user information', function(done) {
      request(server)
        .post('/')
        .send({})
        .set('Accept', 'application/json')
        .expect(400)
        .end(endfn(done));
    });
    it('can get a uid from an email', function(done) {
      request(server)
        .get('/getuid/willis62@purdue.edu')
        .expect(response => expect('"interestsuser"'))
        .expect(200)
        .end(endfn(done));
    });
    it('can create a user', done => {
      request(server)
        .post('/')
        .send({
          email: 'test-user@test-size.com',
          password: 'test-password',
          name: 'test man',
          dob: 'anything'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          test_user_id = res.body.id;
          done();
        });
    });
    it(`can get a user record`, function(done) {
      request(server)
        .get(`/${test_user_id}/`)
        .expect(200, done);
    });
    it('can validate a user record before updating', function(done) {
      request(server)
        .patch(`/invalid_user/`)
        .send({ email: 'test-user@test-site.com' })
        .set('Accept', 'application/json')
        .expect(404)
        .end(endfn(done));
    });
    it('can update a user record', function(done) {
      request(server)
        .patch(`/${test_user_id}/`)
        .send({ email: 'test-user@test-site.com' })
        .set('Accept', 'application/json')
        .expect(response => {
          expect(response.body).to.include({
            Email: 'test-user@test-site.com'
          });
        })
        .expect(200)
        .end(endfn(done));
    });
    it('can validate user information before deleting', function(done) {
      request(server)
        .delete(`/invalid_user`)
        .expect(404, done);
    });
  });
  describe(`teacher`, function(done) {
    var test_user_id;
    before(function() {
      test_user_id = _test_user_id;
    });

    it('can validate new teacher information', done => {
      request(server)
        .post(`/invalid_user/teacher/`)
        .send({})
        .set('Accept', 'application/json')
        .expect(404)
        .end(endfn(done));
    });
    it('can create a teacher record', function(done) {
      request(server)
        .post(`/${test_user_id}/teacher/`)
        .send({ bio: 'my life is a test' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(endfn(done));
    });
    it('can validate a teacher information before updating', function(done) {
      request(server)
        .patch(`/${test_user_id}/teacher/`)
        .send({})
        .set('Accept', 'application/json')
        .expect(400, done);
    });
    it('can validate a teacher record before updating', function(done) {
      request(server)
        .patch('/-LQJxU218iUrEU8_Ut6b/teacher/')
        .send({ bio: 'my life has always been a test' })
        .set('Accept', 'application/json')
        .expect(404)
        .end(endfn(done));
    });
    it('can update a teacher record', function(done) {
      request(server)
        .patch(`/${test_user_id}/teacher/`)
        .send({ bio: 'my life has always been a test' })
        .set('Accept', 'application/json')
        .expect(200)
        .end(endfn(done));
    });
    describe('learning paths', function(done) {
      describe('validate learning path information before creation', function(done) {
        it('can handle no data', function(done) {
          request(server)
            .post(`/${test_user_id}/teacher/learningPath`)
            .send({})
            .set('Accept', 'application/json')
            .expect(400, done);
        });
        it('can handle missing data', function(done) {
          request(server)
            .post(`/${test_user_id}/teacher/learningPath`)
            .send({ topic: 'lol' })
            .set('Accept', 'application/json')
            .expect(400, done);
        });
        it('can validate a teacher record before creating', function(done) {
          request(server)
            .post(`/-LQJxU218iUrEU8_Ut6b/teacher/learningPath`)
            .send({ topic: 'lol', name: 'dab' })
            .set('Accept', 'application/json')
            .expect(404, done);
        });
        it('can create a learning path', function(done) {
          request(server)
            .post(`/${test_user_id}/teacher/learningPath`)
            .send({
              topic: 'lifestyle',
              name: 'how to write test cases'
            })
            .set('Accept', 'application/json')
            .expect(200, done);
        });
      });
    });
  });
  describe(`student`, () => {
    const learning_path_id = '-LNWF1Itj0gydp4gt02V';
    var test_user_id;
    before(function() {
      test_user_id = _test_user_id;
    });
    it('can validate new student information', function(done) {
      request(server)
        .post(`/${test_user_id}/student/`)
        .send({})
        .set('Accept', 'application/json')
        .expect(400)
        .end(endfn(done));
    });
    it('can create a new student record', function(done) {
      request(server)
        .post(`/${test_user_id}/student/`)
        .send({ name: 'test-kun' })
        .expect(200)
        .end(endfn(done));
    });
    it('can validate student information before updating', function(done) {
      request(server)
        .patch(`/${test_user_id}/student/`)
        .send({})
        .expect(400)
        .end(endfn(done));
    });
    it('can validate a student record before updating', function(done) {
      request(server)
        .patch('/invalid_user/student/')
        .send({ name: 'test-chan' })
        .expect(404, done);
    });
    it('can update a student record', function(done) {
      request(server)
        .patch(`/${test_user_id}/student/`)
        .send({ name: 'test-chan' })
        .expect(200)
        .then(() => {
          request(server)
            .get(`/${test_user_id}/`)
            .expect(response => {
              expect(response.body.Student).to.include({
                Nickname: 'test-chan'
              });
            })
            .expect(200, done);
        });
    });
    it('can add an interest', function(done) {
      request(server)
        .patch(`/interestsuser/interest/testinterestcommit`)
        .send({})
        .expect(200)
        .end(endfn(done));
    });
    describe('learning paths', function() {
      it('can validate student before showing learning paths', function(done) {
        request(server)
          .get('/invalid_user/student/learningPaths/')
          .expect(404, done);
      });
      it("can get a student's learning paths", function(done) {
        request(server)
          .get(`/${test_user_id}/student/learningPaths`)
          .expect(200, done);
      });
    });
    describe('following teachers', function() {
      it('can validate the user', function(done) {
        request(server)
          .get(`/invalid_user123/student/following`)
          .expect(404, done);
      });
      it('can validate that the user is a student', function(done) {
        var user_without_student_record = '-LPA_wZA8qnGSjuq3-AU';
        request(server)
          .get(`/${user_without_student_record}/student/following`)
          .expect(404, done);
      });
      it('can validate the data', function(done) {
        request(server)
          .post(`/${test_user_id}/student/following`)
          .send({})
          .expect(400, done);
      });
      it('can add a list of teachers to follow', function(done) {
        var list_of_teachers = [
          '-LNVWR9kD2dvN8GLGFYE',
          '-LNwt_flj5DQWhQ1L88s',
          '-LO-X6FYioiLm9rq36HE'
        ];
        request(server)
          .post(`/${test_user_id}/student/following`)
          .send({ teachers: list_of_teachers })
          .expect(200)
          .then(() => {
            request(server)
              .get(`/${test_user_id}/student/following`)
              .expect(response => {
                expect(response.body.teachers).to.eql(list_of_teachers);
              })
              .expect(200, done);
          });
      });
      it('can add an overlapping list of teachers without duplicate values', function(done) {
        var overlapping_list_of_teachers = [
          '-LO-X6FYioiLm9rq36HE',
          '-LPwc066TGCh4T0sjx4A'
        ];
        var expected_unique_list_of_teachers = [
          '-LNVWR9kD2dvN8GLGFYE',
          '-LNwt_flj5DQWhQ1L88s',
          '-LO-X6FYioiLm9rq36HE',
          '-LPwc066TGCh4T0sjx4A'
        ];
        request(server)
          .post(`/${test_user_id}/student/following`)
          .send({ teachers: overlapping_list_of_teachers })
          .expect(200)
          .then(() => {
            request(server)
              .get(`/${test_user_id}/student/following`)
              .expect(response =>
                expect(response.body.teachers).to.eql(
                  expected_unique_list_of_teachers
                )
              )
              .expect(200, done);
          });
      });
      it('can delete a specific teacher from the list', function(done) {
        var teacher_to_delete = '-LNVWR9kD2dvN8GLGFYE';
        var expected_final_list_of_teachers = [
          '-LNwt_flj5DQWhQ1L88s',
          '-LO-X6FYioiLm9rq36HE',
          '-LPwc066TGCh4T0sjx4A'
        ];
        request(server)
          .delete(`/${test_user_id}/student/following/${teacher_to_delete}`)
          .expect(200)
          .then(() => {
            request(server)
              .get(`/${test_user_id}/student/following`)
              .expect(response =>
                expect(response.body.teachers).to.eql(
                  expected_final_list_of_teachers
                )
              )
              .expect(200, done);
          });
      });
    });
  });
});
