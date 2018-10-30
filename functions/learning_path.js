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

// START CODE FOR LP SEARCH
// GET learning paths for a teacher -> from owner attribute in lp
app.get('/teacher/:user_id', (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths`);
  lpRef
    .orderByChild('Owner')
    .equalTo(request.params.user_id)
    .once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
});

// This endpoint basically makes previous one invalid since you can just put the user_id of teacher as owner=user_id. (But made it as John specifically asked for it)
// GET all lps matching query vars: Name, Topic, Owner (to get all leave empty)
app.get('/search', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths`);
  let name = request.query.name || '';
  let owner = request.query.owner || '';
  let topic = request.query.topic || '';
  let valsExist = true;
  if (name.length == 0 && owner.length == 0 && topic.length == 0) {
    valsExist = false;
  }
  var resp = [];
  await lpRef.once('value', function(snapshot) {
    if (Object.keys(request.query).length > 0 && valsExist) {
      snapshot.forEach(function(childSnapshot) {
        if (
          name &&
          childSnapshot
            .child('Name')
            .val()
            .toLowerCase()
            .indexOf(name.toLowerCase()) != -1
        ) {
          resp.push([childSnapshot.key, childSnapshot.val()]);
        } else if (
          topic &&
          childSnapshot
            .child('Topic')
            .val()
            .toLowerCase()
            .indexOf(topic.toLowerCase()) != -1
        ) {
          resp.push([childSnapshot.key, childSnapshot.val()]);
        } else if (
          owner &&
          childSnapshot
            .child('Owner')
            .val()
            .toLowerCase()
            .indexOf(owner.toLowerCase()) != -1
        ) {
          resp.push([childSnapshot.key, childSnapshot.val()]);
        }
      });
    } else {
      resp = snapshot.val();
    }
  });
  return response.status(200).json(resp);
});

exports.route = app;
