const { firebaseAdmin, ref_has_child } = require('./utils');
const admin = firebaseAdmin;

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
  const found_user = await ref_has_child(
    admin.database().ref(`/Learning_Paths`),
    request.params.lp_id
  );
  if (!found_user)
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

  const { name, owner, mature, topic } = request.body;

  if (!name) {
    return response.status(400).json({
      message: 'You may not have an empty name'
    });
  } else if (!owner) {
    return response.status(400).json({
      message: 'you may not have an empty owner'
    });
  } else if (!topic) {
    return response.status(400).json({
      message: 'you may not have an empty topic'
    });
  } else {
    let resp = {};
    await db
      .push({
        Name: name,
        Owner: owner,
        Topic: topic,
        Mature: mature || 'no',
        Classes: classes || []
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
// body: name, owner, topic
app.patch('/:lp_id', async (request, response) => {
  const db = admin
    .database()
    .ref('/Learning_Paths')
    .child(request.params.lp_id);

  const { name, owner, topic } = request.body;
  const found_user = await ref_has_child(
    admin.database().ref(`/Learning_Paths`),
    request.params.lp_id
  );

  let resp;
  var updates = {};
  if (found_user) {
    if (name) {
      updates['Name'] = name;
    }
    if (owner) {
      updates['Owner'] = owner;
    }
    if (topic) {
      updates['Topic'] = topic;
    }
    db.update(updates);
    db.once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
  } else {
    return response.status(404).json({
      message: `Learning Path with id ${request.params.lp_id} not found`
    });
  }
});

// START CODE FOR LP SEARCH
// GET learning paths for a teacher -> from owner attribute in lp
app.get('/teacher/:user_id', (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths`);
  lpRef
    .orderByChild('Owner')
    .equalTo(request.params.user_id)
    .once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
});

// add ability to sort by interests for specific uid -> if interest match then lp will be ranked higher
// This endpoint basically makes previous one invalid since you can just put the user_id of teacher as owner=user_id. (But made it as John specifically asked for it)
// GET all lps matching query vars: Name, Topic, Owner (to get all leave empty)
app.get('/search', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths`);
  let name = request.query.name || '';
  let owner = request.query.owner || '';
  let topic = request.query.topic || '';
  let mature = request.query.topic || '';
  let uid = request.query.uid || '';
  let valsExist = false;
  let nameExists = true;
  let ownerExists = true;
  let topicExists = true;
  let uidExists = true;
  if (name.length == 0) {
    nameExists = false;
  }
  if (owner.length == 0) {
    ownerExists = false;
  }
  if (topic.length == 0) {
    topicExists = false;
  }
  let interests = [];
  if (uid.length == 0) {
    uidExists = false;
  } else {
    const userRef = admin.database().ref(`/Users/${uid}`);
    await userRef.once('value', function(snapshot) {
      if (!snapshot.exists) {
        // uid not found
        return response.status(400).json({
          message: `User with id: ${uid} not found.`
        });
      } else {
        if (snapshot.hasChild('Interests')) {
          snapshot.child('Interests').forEach(function(childSnap) {
            interests.push(childSnap.val());
          });
        } else {
          return response.status(400).json({
            message: `Learning path with id: ${uid} does not have any Interests.`
          });
        }
      }
    });
  }
  if (nameExists || ownerExists || topicExists || mature || uidExists) {
    valsExist = true;
  }
  var resp = [];
  var resp2 = [];
  await lpRef.once('value', function(snapshot) {
    if (valsExist) {
      snapshot.forEach(function(childSnapshot) {
        let nflg = false;
        let oflg = false;
        let mflg = false;
        let tflg = false;
        if (
          name &&
          childSnapshot.hasChild('Name') &&
          childSnapshot
            .child('Name')
            .val()
            .toLowerCase()
            .indexOf(name.toLowerCase()) != -1
        ) {
          nflg = true;
        }
        if (
          topic &&
          childSnapshot.hasChild('Topic') &&
          childSnapshot
            .child('Topic')
            .val()
            .toLowerCase()
            .indexOf(topic.toLowerCase()) != -1
        ) {
          tflg = true;
        }
        if (
          mature &&
          childSnapshot.hasChild('Mature') &&
          childSnapshot
            .child('Mature')
            .val()
            .toLowerCase() !== 'yes'
        ) {
          tflg = true;
        }
        if (
          owner &&
          childSnapshot.hasChild('Owner') &&
          childSnapshot
            .child('Owner')
            .val()
            .toLowerCase()
            .indexOf(owner.toLowerCase()) != -1
        ) {
          oflg = true;
        }
        // check if all arguments sent are matched
        let nameCheck = true;
        let ownerCheck = true;
        let topicCheck = true;
        let matureCheck = true;
        if (nameExists && !nflg) {
          nameCheck = false;
        }
        if (ownerExists && !oflg) {
          ownerCheck = false;
        }
        if (topicExists && !tflg) {
          topicCheck = false;
        }
        if (mature && !mflg) {
          matureCheck = false;
        }
        if (nameCheck && ownerCheck && matureCheck && topicCheck) {
          if (interests.length > 0) {
            // if snap matches interest then add to resp, else add to resp2
            // console.log(snapshot.val());
            interests.forEach(element => {
              if (
                JSON.stringify(childSnapshot.val())
                  .toLowerCase()
                  .indexOf(element.toLowerCase()) != -1
              ) {
                //snapshot contains interest
                console.log(childSnapshot.val());
                resp.push([childSnapshot.key, childSnapshot.val()]);
              } else {
                resp2.push([childSnapshot.key, childSnapshot.val()]);
              }
            });
          } else {
            resp.push([childSnapshot.key, childSnapshot.val()]);
          }
        }
      });
    } else {
      resp = snapshot.val();
    }
  });
  if (resp2.length > 0) {
    resp = resp.concat(resp2);
  }
  return response.status(200).json(resp);
});

exports.route = app;
