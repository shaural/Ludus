const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

app.post('/:lp_id/class', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Class`);
  if (!db)
    return response
      .status(404)
      .json({
        message: `learning path with id ${request.params.lp_id} not found`
      });

  const { name, content_type, owner, tags } = request.body;
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
  return response.status(200).json(resp);
});

exports.route = app;
