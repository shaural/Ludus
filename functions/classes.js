const { firebaseAdmin, ref_has_child } = require('./utils');
const admin = firebaseAdmin;

const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')({ origin: true }));

app.post('/', async (request, response) => {
  const db = admin.database().ref(`/Classes`);

  const { name, content_type, owner, mature, tags } = request.body;
  try {
    await db
      .push({
        Name: name,
        Owner: owner,
        Content_type: content_type || [],
        Mature: mature || 'no',
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

  const {
    name,
    rating,
    content_type,
    owner,
    mature,
    tags,
    comments
  } = request.body;

  await db
    .push({
      Name: name,
      Owner: owner,
      Ratings: rating || [],
      Content_type: content_type || [],
      Mature: mature || 'no',
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
  const found = await ref_has_child(
    admin.database().ref(`/Classes/`),
    request.params.class_id
  );
  if (!found)
    return response.status(404).json({
      message: `class with id ${request.params.id} not found`
    });
  const db = admin.database().ref(`/Classes/${request.params.class_id}`);
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
  const found = await ref_has_child(
    admin.database().ref('/Classes'),
    request.params.class_id
  );
  if (!found)
    return response.status(404).json({
      message: `class with id ${request.params.id} not found`
    });
  const db = admin
    .database()
    .ref(`/Classes/`)
    .child(request.params.class_id);
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

app.post('/:class_id/comment', async (request, response) => {
  const found = await ref_has_child(
    admin.database().ref(`/Classes`),
    request.params.class_id
  );
  if (!found)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} not found`
    });

  if (!request.body)
    return response.status(400).json({ message: 'malformed request' });

  const { author, comment } = request.body;
  if (!author)
    return response.status(400).json({ message: 'author cannot be blank' });
  if (!comment)
    return response
      .status(400)
      .json({ message: 'cannot post an empty comment' });

  try {
    let resp;
    await admin
      .database()
      .ref(`/Classes/${request.params.class_id}/Comments`)
      .push({
        Author: author,
        Comment: comment,
        Created: new Date() // doesn't work?
      })
      .once('value')
      .then(
        snapshot =>
          (resp = {
            id: snapshot.key,
            ...snapshot.val()
          })
      );
    return response.status(200).json(resp);
  } catch (err) {
    return response.status(500).json({
      message: 'an error occurred when posting a comment',
      err
    });
  }
});

app.get('/:class_id/comments', async (request, response) => {
  const found = await ref_has_child(
    admin.database().ref('/Classes'),
    request.params.class_id
  );
  if (!found)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} not found`
    });

  const has_comments = await ref_has_child(
    admin.database().ref(`/Classes/${request.params.class_id}`),
    'Comments'
  );
  if (!has_comments) return response.status(200).json([]);

  try {
    let resp = [];
    await admin
      .database()
      .ref(`/Classes/${request.params.class_id}/Comments`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(child =>
          resp.push({
            id: child.key,
            ...child.val()
          })
        );
      });
    return response.status(200).json(resp);
  } catch (err) {
    return response.status(500).json({
      message: 'an error occurred when retrieving comments',
      err
    });
  }
});

app.patch('/:class_id/comment/:comment_id', async (request, response) => {
  const found_class = await ref_has_child(
    admin.database().ref('/Classes'),
    request.params.class_id
  );
  if (!found_class)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} not found`
    });

  const has_comments = await ref_has_child(
    admin.database().ref(`/Classes/${request.params.class_id}`),
    'Comments'
  );
  if (!has_comments)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} has no comments`
    });

  const found_comment = await ref_has_child(
    admin.database().ref(`/Classes/${request.params.class_id}/Comments`),
    request.params.comment_id
  );
  if (!found_comment)
    return response.status(404).json({
      message: `class with id ${
        request.params.class_id
      } has no comment with id ${request.params.comment_id}`
    });

  if (!request.body || !request.body.comment)
    return response.status(400).json({
      message: `need to provide an updated comment`
    });

  try {
    // update comment
    await admin
      .database()
      .ref(
        `/Classes/${request.params.class_id}/Comments/${
          request.params.comment_id
        }`
      )
      .child('Comment')
      .set(request.body.comment);
    // update edited timestamp
    await admin
      .database()
      .ref(
        `/Classes/${request.params.class_id}/Comments/${
          request.params.comment_id
        }`
      )
      .child('Edited')
      .set(new Date());
  } catch (err) {
    return response.status(500).json({
      message: 'an error occurred when updating the comment',
      err
    });
  }
  return response.status(200).json({});
});

app.delete('/:class_id/comment/:comment_id', async (request, response) => {
  const found_class = await ref_has_child(
    admin.database().ref('/Classes'),
    request.params.class_id
  );
  if (!found_class)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} not found`
    });

  const has_comments = await ref_has_child(
    admin.database().ref(`/Classes/${request.params.class_id}`),
    'Comments'
  );
  if (!has_comments)
    return response.status(404).json({
      message: `class with id ${request.params.class_id} has no comments`
    });

  const found_comment = await ref_has_child(
    admin.database().ref(`/Classes/${request.params.class_id}/Comments`),
    request.params.comment_id
  );
  if (!found_comment)
    return response.status(404).json({
      message: `class with id ${
        request.params.class_id
      } has no comment with id ${request.params.comment_id}`
    });

  try {
    await admin
      .database()
      .ref(
        `/Classes/${request.params.class_id}/Comments/${
          request.params.comment_id
        }`
      )
      .remove();
  } catch (err) {
    return response.status(500).json({
      message: 'an error occurred when deleting the comment',
      err
    });
  }
  return response.status(200).json({});
});

// Code for Class Search by: name, owner, content_type, Tags, mature filter
app.get('/search', async (request, response) => {
  const classRef = admin.database().ref(`/Classes`);
  let name = request.query.name || '';
  let owner = request.query.owner || '';
  let content_type = request.query.content_type || '';
  let tag = request.query.tag || '';
  let mature = request.query.mature || '';
  let nameExists = true;
  let ownerExists = true;
  let ctExists = true;
  let tagExists = true;
  let matureExists = true;
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
  if (mature.length == 0) {
    matureExists = false;
  }
  if (ctExists || nameExists || ownerExists || tagExists || matureExists) {
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
        let mflg = true;
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
        //check if mature filter is on, and if the class is marked so
        if (mature && childSnapshot.child('Mature').val() == 'yes') {
          mflg = false;
        }
        // check if all arguments sent are matched
        let nameCheck = true;
        let ownerCheck = true;
        let ctCheck = true;
        let tagCheck = true;
        let matureCheck = true;
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
        if (matureExists && !mflg) {
          matureCheck = false;
        }
        if (nameCheck && ownerCheck && ctCheck && tagCheck && matureCheck) {
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
