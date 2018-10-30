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
exports.route = app;
