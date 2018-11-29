const admin = require('./utils').firebaseAdmin;
const app = require('express')();
app.use(require('cors')({ origin: true }));

// Send notification to a User
// Body: sender_name, text
app.post('/:receiver_id', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Notificaitons/${request.params.receiver_id}`);
  let receiver = request.params.receiver_id;
  const { sender_name, text } = request.body;
  console.log(sender_name);
  console.log(text);
  if (sender_name.length > 0 && text.length > 0) {
    db.push({
      sender_name: sender_name,
      text: text
    });
    return response.status(200).json({
      message: `Notification successfully sent.`
    });

    // //store notification into
    //   await db
    //   .once('value', snapshot => {
    //     //push to receiver
    //     db.push({
    //       Name: tags[i]
    //     });
    //   });
  } else {
    //sender or text not provided
    return response.status(400).json({
      message: `Body arguments are either empty or invalid.`
    });
  }
});

// GET method (for all records)
app.get('/', (request, response) => {
  const ref = admin.database().ref('/Tags');
  ref.once('value', function(snapshot) {
    return response.status(200).json(snapshot.val());
  });
});

exports.route = app;
