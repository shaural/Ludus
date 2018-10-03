const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

app.patch('/classes/:class_id', async (request, response) => {
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
      .once('value').then(snapshot => {
        resp = {
          id: snapshot.key,
          class: { ...snapshot.val() }
        };
      });

  return response.status(200).json(resp);
});

exports.route = app;
