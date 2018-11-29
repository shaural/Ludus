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
  const { subject, text, sender_name } = request.body;
  if (subject.length > 0 && text.length > 0) {
    db.push({
      subject: subject,
      text: text,
      sender_name: sender_name || ''
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
      return response.status(200).json(snapshot.val());
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
