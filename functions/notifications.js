const admin = require('./utils').firebaseAdmin;
const app = require('express')();
app.use(require('cors')({ origin: true }));

// Send notification to a User
// Body: sender_name, text
app.post('/:receiver_id', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Notifications/${request.params.receiver_id}`);
  let receiver = request.params.receiver_id;
  const { sender_name, text } = request.body;
  if (sender_name.length > 0 && text.length > 0) {
    db.push({
      sender_name: sender_name,
      text: text
    });
    return response.status(200).json({
      message: `Notification successfully sent.`
    });
  } else {
    //sender or text not provided
    return response.status(400).json({
      message: `Body arguments are either empty or invalid.`
    });
  }
});

// GET method (for all notitifications for user: user_id)
app.get('/:user_id', (request, response) => {
  const ref = admin.database().ref(`/Notifications/${request.params.user_id}`);
  ref.once('value', function(snapshot) {
    if (snapshot.hasChildren()) {
      let resp = [];
      snapshot.forEach(function(childSnap) {
        resp.push([
          childSnap.child('sender_name').val(),
          childSnap.child('text').val()
        ]);
      });
      return response.status(200).json(resp);
    } else {
      return response.status(400).json({
        message: `User with id: ${
          request.params.user_id
        } does not have any notifications.`
      });
    }
  });
});

exports.route = app;
