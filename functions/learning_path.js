const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

// Body: Index: Order of class in learning path, class_id
app.post('/:lp_id/class', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Classes`);

  const { index, class_id } = request.body;
  if (index < 0) {
    // invalid (assuming index starting with 0)
    return response.status(400).json({
      message: `Invalid index.`
    });
  }
  if (!db)
    return response.status(404).json({
      message: `learning path with id ${request.params.lp_id} not found`
    });

  // TODO: append to learningpath/:lp_id/class array without creating UID structure?
  if (!class_id)
    return response.status(400).json({ message: 'class_id can not be empty' });
  try {
    // check if index already taken (need to use PATCH instead)
    let indexExists = false;
    await db.once('value').then(snapshot => {
      if (snapshot.hasChild(index)) {
        indexExists = true;
      }
    });

    if (indexExists) {
      return response
        .status(400)
        .json({
          message: `Learning path already contains class at index ${index}. Please use PATCH method instead.`
        });
    }
    await db
      .set({
        index: class_id
      })
      .once('value')
      .then(snapshot => {
        resp = snapshot.val();
      });
  } catch (e) {
    return response.status(400).json({ message: 'malformed request' });
  }
  return response.status(200).json(resp);
});

app.get('/:lp_id/classes', (request, response) => {
  //console.log('Ran new code');
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Classes`);
  if (!db)
    return response
      .status(404)
      .json({ message: ` ${request.params.lp_id} does not have any classes` });
  else {
    db.once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
  }
});

exports.route = app;
