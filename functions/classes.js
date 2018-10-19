const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

app.post('/', async (request, response) => {
  const db = admin.database().ref(`/Classes`);

  const { name, content_type, owner, tags } = request.body;
  try {
    await db
      .push({
        Name: name,
        Owner: owner,
        Content_type: content_type || [],
        Tags: tags || []
      })
      .once('value')
      .then(snapshot => {
        resp = {
          id: snapshot.key,
          class: { ...snapshot.val() }
        };
      });
  } catch (e) {
    return response.status(400).json({ message: 'malformed request' });
  }
  return response.status(200).json(resp);
});

app.patch('/:class_id', async (request, response) => {
  const db = admin.database().ref(`/classes/${request.params.class_id}`);
  if (!db)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} not found`
    });

  const { name, rating, content_type, owner, tags, comments } = request.body;

  await db
    .push({
      Name: name,
      Owner: owner,
      Ratings: rating || [],
      Content_type: content_type || [],
      Tags: tags || [],
      Comments: comments || []
    })
    .once('value')
    .then(snapshot => {
      resp = {
        id: snapshot.key,
        class: { ...snapshot.val() }
      };
    });

  return response.status(200).json(resp);
});

// Get all learning paths associated with a student
app.get('/:user_id/LearningPaths', async (request, response) => {
  const db = admin.database().ref(`/Users/${request.params.user_id}`);
  let out = db.child('LP_Enrolled');
  if (!db)
    return response.status(404).json({
      message: `No learning paths for this user!`
    });
  console.log(out);

  try {
    let out2 = db.once('value').then(snapshot => {
      resp = {
        id: snapshot.key,
        class: { ...snapshot.val() }
      };
    });
    return response.status(200).json(out2);
  } catch (e) {
    response.status(400).json({
      message: 'Something went wrong getting the learning paths'
    });
  }
});
app.delete('/:class_id', async (request, response) => {
  const db = admin.database().ref(`/Classes/${request.params.class_id}`);
  if (!db)
    return response.status(404).json({
      message: `class with id ${request.params.id} not found`
    });
  return db
    .remove()
    .then(() =>
      response
        .status(200)
        .json({ message: `class with id ${request.params.class_id} deleted` })
    )
    .catch(err =>
      response.status(400).json({
        message: `could not delete class with id ${request.params.class_id}`,
        err
      })
    );
});

exports.route = app;
