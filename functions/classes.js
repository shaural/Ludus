const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

app.post('/', async (request, response) => {
  const db = admin.database().ref(`/Classes`);

  const { name, content_type, owner, tags } = request.body;
  try {
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
  } catch (e) {
    return response.status(400).json({ message: 'malformed request' });
  }
  return response.status(200).json(resp);
});

app.patch('/:class_id', async (request, response) => {
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
    .once('value')
    .then(snapshot => {
      resp = {
        id: snapshot.key,
        class: { ...snapshot.val() }
      };
    });

  return response.status(200).json(resp);
});

app.delete('/:class_id', async (request, response) => {
  const db = admin.database().ref(`/Classes/${request.params.class_id}`);
  if (!db)
    return response.status(404).json({
      message: `class with id ${request.params.id} not found`
    });
  return db
    .remove()
    .then(() =>
      response
        .status(200)
        .json({ message: `class with id ${request.params.class_id} deleted` })
    )
    .catch(err =>
      response.status(400).json({
        message: `could not delete class with id ${request.params.class_id}`,
        err
      })
    );
});

//Get class by owner
app.get('/classlist/:user_id', (request, response) => {
  const classRef = admin.database().ref(`/Classes`);
  classRef
    .orderByChild('Owner')
    .equalTo(request.params.user_id)
    .once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
});

// Class information API
app.get('/:class_id/info', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Classes/`)
    .child(request.params.class_id);
  if (!db)
    return response.status(404).json({
      message: `class with id ${request.params.id} not found`
    });
  var out = {};
  db.once('value').then(function(snapshot) {
    out = snapshot.val();
    if (!out) {
      return response.status(404).json({
        message: 'This class ID does not exist'
      });
    }
    try {
      return response.status(200).json({
        ...out
      });
    } catch (e) {
      return response.status(404).json({
        message: 'There was a fatal error getting the class data'
      });
    }
  });
});

// Code for Class Search by: name, owner, content_type, Tags
app.get('/search', async (request, response) => {
  const classRef = admin.database().ref(`/Classes`);
  let name = request.query.name || '';
  let owner = request.query.owner || '';
  let content_type = request.query.content_type || '';
  let tag = request.query.tag || '';
  let nameExists = true;
  let ownerExists = true;
  let ctExists = true;
  let tagExists = true;
  let valsExist = false;
  if (name.length == 0) {
    nameExists = false;
  }
  if (owner.length == 0) {
    ownerExists = false;
  }
  if (content_type.length == 0) {
    ctExists = false;
  }
  if (tag.length == 0) {
    tagExists = false;
  }
  if (ctExists || nameExists || ownerExists || tagExists) {
    valsExist = true;
  }
  var resp = [];
  await classRef.once('value', function(snapshot) {
    if (valsExist) {
      snapshot.forEach(function(childSnapshot) {
        let nflg = false;
        let oflg = false;
        let cflg = false;
        let tflg = false;
        if (
          name &&
          childSnapshot
            .child('Name')
            .val()
            .toLowerCase()
            .indexOf(name.toLowerCase()) != -1
        ) {
          nflg = true;
        }
        if (
          content_type &&
          childSnapshot
            .child('Content_Type')
            .val()
            .toLowerCase()
            .indexOf(content_type.toLowerCase()) != -1
        ) {
          cflg = true;
        }
        if (
          owner &&
          childSnapshot
            .child('Owner')
            .val()
            .toLowerCase()
            .indexOf(owner.toLowerCase()) != -1
        ) {
          oflg = true;
        }
        if (tagExists) {
          //loop through tags to see if match
          childSnapshot.child('Tags').forEach(function(tagSnap) {
            if (
              tagSnap
                .val()
                .toLowerCase()
                .indexOf(tag.toLowerCase()) != -1
            ) {
              tflg = true;
            }
          });
        }
        // check if all arguments sent are matched
        let nameCheck = true;
        let ownerCheck = true;
        let ctCheck = true;
        let tagCheck = true;
        if (nameExists && !nflg) {
          nameCheck = false;
        }
        if (ownerExists && !oflg) {
          ownerCheck = false;
        }
        if (ctExists && !cflg) {
          ctCheck = false;
        }
        if (tagExists && !tflg) {
          tagCheck = false;
        }
        if (nameCheck && ownerCheck && ctCheck && tagCheck) {
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
