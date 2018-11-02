const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

app.post('/:lp_id/class', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Class`);
  if (!db)
    return response.status(404).json({
      message: `learning path with id ${request.params.lp_id} not found`
    });

  // TODO: append to learningpath/:lp_id/class array without creating UID structure?
  const { class_id } = request.body;
  if (!class_id)
    return response.status(400).json({ message: 'class_id can not be empty' });
  try {
    await db
      .push({
        Class_Id: class_id
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

app.get('/:lp_id/class', (request, response) => {
  //console.log('Ran new code');
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/class`);
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

// delete learning path with id lp_id
app.delete('/:lp_id', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths/${request.params.lp_id}`);
  if (!lpRef)
    return response.status(404).json({
      message: `Learning path with id ${request.params.lp_id} not found`
    });

  //remove from db (no need to check if exists since if it doesn't then wont remove anything)
  lpRef
    .remove()
    .then(function() {
      return response.status(200).json({
        message: `Learning path with id ${request.params.lp_id} deleted.`
      });
    })
    .catch(function(error) {
      console.log('Error deleting learning path:', error);
      return response.status(400).json({
        message: `Error, Could not delete learning path with id ${
          request.params.lp_id
        }`
      });
    });
});

app.post('/', async (request, response) => {
  const db = admin.database().ref('/Learning_Paths');

  const { name, owner, topic } = request.body;

  if (!name) {
    return response.status(400).json({
      message: 'You may not have an empty name'
    });
  } else if (!owner) {
    return response.status(400).json({
      message: 'you may not have an empty owner'
    });
  } else if (!topic) {
    return response.status(400).json({
      message: 'you may not have an empty topic'
    });
  } else {
    let resp = {};
    await db
      .push({
        Name: name,
        Owner: owner,
        Topic: topic
      })
      .once('value')
      .then(snapshot => {
        resp = {
          id: snapshot.key,
          learning_path: { ...snapshot.val() }
        };
      });

    return response.status(200).json(resp);
  }
});

// body: name, owner, topic
app.patch('/:lp_id', async (request, response) => {
  const db = admin
    .database()
    .ref('/Learning_Paths')
    .child(request.params.lp_id);

  const { name, owner, topic } = request.body;

  let resp;
  var updates = {};
  if (db) {
    if (name) {
      updates['Name'] = name;
    }
    if (owner) {
      updates['Owner'] = owner;
    }
    if (topic) {
      updates['Topic'] = topic;
    }
    db.update(updates);
    db.once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
  } else {
    return response.status(404).json({
      message: `Learning Path with id ${request.params.lp_id} not found`
    });
  }
});

exports.route = app;
