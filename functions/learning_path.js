const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

// Body: Index: Order of class in learning path, class_id
app.post('/:lp_id/class', async (request, response) => {
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Classes`);

  const { index, class_id } = request.body;
  if (index < 0) {
    // invalid (assuming index starting with 0)
    return response.status(400).json({
      message: `Invalid index.`
    });
  }
  if (!db)
    return response.status(404).json({
      message: `learning path with id ${request.params.lp_id} not found`
    });

  // TODO: append to learningpath/:lp_id/class array without creating UID structure?
  if (!class_id)
    return response.status(400).json({ message: 'class_id can not be empty' });
  try {
    // check if index already taken (need to use PATCH instead)
    let indexExists = false;
    await db.once('value').then(snapshot => {
      if (snapshot.hasChild(index)) {
        indexExists = true;
      }
    });

    if (indexExists) {
      return response.status(400).json({
        message: `Learning path already contains class at index ${index}. Please use PATCH method instead.` // TODO create patch endpoint
      });
    }
    db.child(index).set(class_id);
  } catch (e) {
    return response
      .status(400)
      .json({ message: `malformed request... exception: ${e}` });
  }
  return response.status(200).json({
    message: `Class: ${class_id} has been added to learning path with id: ${
      request.params.lp_id
    } at index: ${index}`
  });
});

app.get('/:lp_id/classes', (request, response) => {
  //console.log('Ran new code');
  const db = admin.database().ref(`/Learning_Paths/${request.params.lp_id}`);
  if (!db)
    return response
      .status(404)
      .json({ message: `${request.params.lp_id} does not have any classes` });
  else {
    db.once('value', function(snapshot) {
      if (snapshot.hasChild('Classes')) {
        return response.status(200).json(snapshot.child('Classes').val());
      } else {
        return response.status(400).json({
          message: `Learning path with id: ${
            request.params.lp_id
          } does not exist or does not have any classes.`
        });
      }
    });
  }
});

// delete learning path with id lp_id
app.delete('/:lp_id', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths/${request.params.lp_id}`);
  if (!lpRef)
    return response.status(404).json({
      message: `Learning path with id ${request.params.lp_id} not found`
    });

  //remove from db (no need to check if exists since if it doesn't then wont remove anything)
  lpRef
    .remove()
    .then(function() {
      return response.status(200).json({
        message: `Learning path with id ${request.params.lp_id} deleted.`
      });
    })
    .catch(function(error) {
      console.log('Error deleting learning path:', error);
      return response.status(400).json({
        message: `Error, Could not delete learning path with id ${
          request.params.lp_id
        }`
      });
    });
});

app.post('/', async (request, response) => {
  const db = admin.database().ref('/Learning_Paths');

  const { name, owner, topic } = request.body;

  //DO I NEED TO CHECK IF OWNER IS A TEACHER?
  if (!name.toString().length) {
    return response.status(400).json({
      message: 'You may not have an empty name'
    });
  } else if (!owner.toString().length) {
    return response.status(400).json({
      message: 'Please enter your age'
    });
  } else {
    let resp = {};
    await db
      .push({
        Name: name,
        Owner: owner,
        Topic: topic
      })
      .once('value')
      .then(snapshot => {
        resp = {
          id: snapshot.key,
          learning_path: { ...snapshot.val() }
        };
      });

    return response.status(200).json(resp);
  }
});

// Implement GET next class from index, current_index: index of current class
app.get('/:lp_id/nextClassByIndex/:current_index', (request, response) => {
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Classes`);
  if (!db) {
    return response
      .status(404)
      .json({ message: `${request.params.lp_id} does not have any classes` });
  } else {
    db.orderByKey().once('value', function(snapshot) {
      if (snapshot.exists()) {
        let indexReched = false;
        let classFound = false;
        if (snapshot.hasChild(request.params.current_index)) {
          snapshot.forEach(function(childSnapshot) {
            if (indexReched) {
              classFound = true;
              return response.status(200).json(childSnapshot.val());
            }
            if (childSnapshot.key == request.params.current_index) {
              indexReched = true;
            }
          });
          if (indexReched && !classFound) {
            // last -> no more next class
            return response.status(400).json({
              message: `Learning path with id: ${
                request.params.lp_id
              } does not does not have any more classes (after index: ${
                request.params.current_index
              }).`
            });
          }
        } else {
          // current_index does not exist (no class there)
          return response
            .status(400)
            .json({ message: 'Invalid current index' });
        }
      } else {
        return response.status(400).json({
          message: `Learning path with id: ${
            request.params.lp_id
          } does not exist.`
        });
      }
    });
  }
});

exports.route = app;
