
const app = require('express')();

app.use(require('cors')({origin: true}));

const admin = require('./utils').firebaseAdmin;

app.post('/', (request, response) => {


  const database = admin.database().ref('/Users/${request.params.user_id}/Teacher');

  if(!database){
    return response.status(404).json({
      message: 'No teacher with this ID found'
    });
  }
    const { bio, newPath, newClass, notifications } = request.body;

  await database
    .push({
      Bio: bio,
      Notifications: notifications,
      Classes: newClass, //add to array?
      Paths: newPath //^

    })
    .once('value')
    .then(snapshot => {
      resp = {
        id: snapshot.key,
        teacher: { ...snapshot.val()}
      };
    });

    return response.status(200).json(resp);

});


exports.route = app;
