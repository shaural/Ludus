const admin = require('./utils').firebaseAdmin;
const app = require('express')();
app.use(require('cors')({ origin: true }));

// from array of tags, checks if tag exists in tags table, if not then it will add it.
app.post('/', async (request, response) => {
    const db = admin.database().ref(`/Tags`);
    if (!db)
      return response.status(404).json({
        message: `tags table not found.`
      });
    const { tags } = request.body;
    console.log(tags)

    for (i in tags) {
      await db.orderByChild("Name").equalTo(tags[i]).once("value",snapshot => {
          if (snapshot.exists()){
            //tag already there
            console.log(snapshot.val());
          } else {
            //add tag to table
            db.push({
              Name: tags[i]
            });
          }
      });
    }
    db.once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
  });

  // GET method (for all records)
app.get('/', (request, response) => {
    const ref = admin.database().ref('/Tags');
    ref.once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
  });
exports.route = app;
