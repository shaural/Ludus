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

app.delete('/:teacher_id/:class_id', async (request, response) => {
  // console.log(request.params.teacher_id)
  // console.log(request.params.class_id)
  const db = admin.database().ref(`/Users/${request.params.teacher_id}`);
  if (!db)
    return response.status(404).json({
      message: `User does not exist`
    });
  var teacherName;
  var classOwner;
  try {
    db.child('Name')
      .once('value')
      .then(function(snapshot) {
        teacherName = snapshot.val();
      });
  } catch (e) {
    return response.status(404).json({
      message: "An error occurred getting the teacher's name"
    });
  }
  const classref = admin.database().ref(`/Classes/${request.params.class_id}`);
  if (!classref) {
    return response.status(404).json({
      message:
        'No class with the class id ' + request.params.class_id + ' was found!'
    });
  }
  //read class owner name
  try {
    classref
      .child('Owner')
      .once('value')
      .then(function(snapshot) {
        classOwner = snapshot.val();
      });
  } catch (e) {
    return response.status(403).json({
      message: 'There was an error getting the class owner name'
    });
  }
  if (teacherName != classOwner || (!teacherName || !classOwner)) {
    return response.status(403).json({
      message: "You can't delete a class that you do not own!"
    });
  } else {
    try {
      classref.remove();
      return response.status(200).json({
        message: 'Class deleted'
      });
    } catch (error) {
      return response.status(403).json({
        message: 'There was an error during the class deletion.'
      });
    }
  }
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

// Class information API
app.get('/:class_id/info', async (request, response) => {
  //IMPORTANT ASSUMPTION
  //Each class is represented by an id with all attributes and fields
  //such as Content-Type, Ratings, etc as children

  //function will return a map [to frontend], so it will be traversable with a for each loop

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
    out[snapshot.key] = snapshot.val();
    try {
      return response.status(200).json({
        out
      });
    } catch (e) {
      return response.status(404).json({
        message: 'There was a fatal error getting the class data'
      });
    }
  });
});
exports.route = app;
