const { firebaseAdmin, ref_has_child } = require('./utils');
const admin = firebaseAdmin;

const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cors')({ origin: true }));

// Body: Index: Order of class in learning path, class_id
app.post('/:lp_id/class', async (request, response) => {
  if (!request.body)
    return response.status(400).json({ message: 'malformed request' });
  const found = await ref_has_child(
    admin.database().ref('/Learning_Paths'),
    request.params.lp_id
  );
  if (!found)
    return response.status(404).json({
      message: `learning path with id ${request.params.lp_id} not found`
    });

  const { index, class_id } = request.body;
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/Classes`);

  if (!index || index < 0) {
    // invalid (assuming index starting with 0)
    return response.status(400).json({
      message: `Invalid index.`
    });
  }

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

      //TODO: Call the patch endpoint for any pre-reqs that have been entered?
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

app.get('/:lp_id/classes', async (request, response) => {
  const found_lp = await ref_has_child(
    admin.database().ref('/Learning_Paths'),
    request.params.lp_id
  );
  if (!found_lp)
    return response.status(404).json({
      message: `learning path with id ${
        request.params.lp_id
      } does not exist or has no classes`
    });
  else {
    const db = admin.database().ref(`/Learning_Paths/${request.params.lp_id}`);
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

app.patch('/:lp_name/mandatory_pre_reqs', async (request, response) => {
  //note, this function should not be passed an array of pre-reqs, but rather one at a time

  let temp = request.body.pre_reqs_list;
  // console.log(request.params.lp_id);
  // let pre_reqs_array = temp.toString().split(',');
  let name = request.params.lp_name;
  let db = await ref_has_child(
    admin.database().ref(`/Learning_Paths/${name}`),
    'Pre-reqs'
  );
  if (!db) {
    return response.status(404).json('Unable to find pre-requisites');
  }
  let tempref = admin
    .database()
    .ref(`/Users/Learning_Paths`)
    .child(name);
  if (!tempref) {
    let out = 'Error: Learning Path ' + temp2 + ' does not exist';
    return response.status(404).json({
      out
    });
  }

  await admin
    .database()
    .ref('/Users/Learning_Paths')
    .once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        //we found the learning path
        // console.log(snapshot.key + ' ' + snapshot.val());
        if (childSnapshot.key === 'Name') {
          tempref = admin
            .database()
            .ref(`/Users/Learning_Paths/${snapshot.key}`);
        }
      });
    });

  let mandatory = await ref_has_child(
    admin.database().ref(`/Learning_Paths/${name}/Pre-reqs`),
    'Mandatory'
  );

  if (!mandatory) {
    return response.status(404).json('Unable to make mandatory pre-requisite');
  }

  let rec_ref = admin
    .database()
    .ref(`/Learning_Paths/${lpid}/Pre-reqs/Mandatory`);
  try {
    // console.log(preq);
    await rec_ref.push({ Prereq: preq });
  } catch (err) {
    // console.log(err);
    return response
      .status(404)
      .json('An error happened when setting the mandatory pre-requsisites');
  }
  return response.status(200).json('Successfully set mandatory pre-req');
});

app.patch('/:lp_name/recommended_pre_reqs', async (request, response) => {
  let temp = request.body.pre_reqs_list;
  // console.log(request.params.lp_id);
  // let pre_reqs_array = temp.toString().split(',');

  //the loop may need to be removed in the future because this function will
  //likely only be called with one learning path at a time
  //will discuss during meeting or via slack

  //checks that the learning path name actually exists
  //placeholder, will always evaluate to false, if the lp name does not exist
  //so we must wait for the loop below to find the correct path
  let tempref = admin
    .database()
    .ref(`/Users/Learning_Paths`)
    .child(temp2);
  await admin
    .database()
    .ref('/Users/Learning_Paths')
    .on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        //we found the learning path
        // console.log(snapshot.key + ' ' + snapshot.val());

        if (childSnapshot.val() === temp2) {
          // console.log("Found: " + childSnapshot.key)
          tempref = admin
            .database()
            .ref(`/Users/Learning_Paths/${snapshot.key}`);
        }
      });
    });
  if (!tempref) {
    let out = 'Error: Learning Path ' + temp2 + ' does not exist';
    return response.status(404).json({
      out
    });
  }

  let db = await ref_has_child(
    admin.database().ref(`/Learning_Paths/${lpid}`),
    'Pre-reqs'
  );
  if (!db) {
    return response.status(404).json('Unable to find pre-requisites');
  }

  //For now, we will push to recommended pre-reqs
  //there will be a different endpoint that pushes to mandatory pre-reqs
  //something like /:lp_id/mandatory_pre_reqs

  let rec = await ref_has_child(
    admin.database().ref(`/Learning_Paths/${lpid}/Pre-reqs`),
    'Recommended'
  );

  // let rec = admin.database().ref(`/Learning_Paths/${lpid}/Pre-reqs`).child('Recommended')
  if (!rec) {
    return response
      .status(404)
      .json('Unable to make recommended pre-requisite');
  }
  let rec_ref = admin
    .database()
    .ref(`/Learning_Paths/${lpid}/Pre-reqs/Recommended`);
  try {
    for (t in pre_reqs_array) {
      let preq = pre_reqs_array[t];
      // console.log(preq);
      await rec_ref.push({ Prereq: preq });
    }
  } catch (err) {
    // console.log(err);
    return response
      .status(404)
      .json('An error happened when setting the pre-requsisites');
  }
  return response.status(200).json('Successfully set pre-reqs');
  // console.log(temp.length)
  /*
    for(t in temp){
    console.log("Pre-reqs: " + temp[t])
    }
    */
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
        lpid = snapshot.key;
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

app.delete('/:lp_id/class/:index', async (request, response) => {
  const found_lp = await ref_has_child(
    admin.database().ref('/Learning_Paths'),
    request.params.lp_id
  );
  if (!found_lp)
    return response.status(404).json({
      message: `learning path with id ${request.params.lp_id} not found`
    });
  const found_idx = await ref_has_child(
    admin.database().ref(`/Learning_Paths/${request.params.lp_id}/Classes`),
    request.params.index
  );
  if (!found_idx)
    return response.status(404).json({
      message: `learning path has no class at index ${request.params.index}`
    });

  try {
    await admin
      .database()
      .ref(
        `/Learning_Paths/${request.params.lp_id}/Classes/${
          request.params.index
        }`
      )
      .remove();
  } catch (err) {
    return response.status(500).json({
      message: 'an error occurred when removing the class',
      err
    });
  }
  return response.status(200).json({
    message: `successfully removed class at index ${
      request.params.index
    } from learning path`
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
            interests.forEach(element => {
              if (
                JSON.stringify(childSnapshot.val())
                  .toLowerCase()
                  .indexOf(element.toLowerCase()) != -1
              ) {
                //snapshot contains interest
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

//Get individual lp with lpID & all children
app.get('/:lp_id', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths/${request.params.lp_id}`);
  lpRef.once('value', function(snapshot) {
    return response.status(200).json(snapshot.val());
  });
});
// fetch similar LPs like ones I have completed
app.get('/student/:user_id/similarCompleted', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths`);
  const userRef = admin.database().ref(`/Users`);
  let uid = request.params.user_id;
  // get LPs user with uid has completed
  let lps_compelted = [];
  await userRef.once('value', function(snapshot) {
    if (snapshot.hasChild(uid)) {
      if (
        snapshot
          .child(uid)
          .child('Student')
          .hasChild('LP_Enrolled')
      ) {
        // student is enrolled in atleast 1 lp
        snapshot
          .child(uid)
          .child('Student')
          .child('LP_Enrolled')
          .forEach(function(childSnap) {
            if (
              childSnap
                .child('LP_Status')
                .val()
                .indexOf('Completed') != -1
            ) {
              // childSnap lp is completed
              lps_compelted.push(childSnap.key);
            }
          });
      } else {
        // student not enrolled in any lps
        return response.status(400).json({
          message: `User with id: ${uid} not enrolled in any Learning Paths.`
        });
      }
    } else {
      // User does not exist
      return response.status(400).json({
        message: `User with id: ${uid} not found.`
      });
    }
  });
  let resp = [];
  await lpRef.once('value', function(snapshot) {
    lps_compelted.forEach(completedLp => {
      //get info for compeletedLp
      let owner = '';
      let topic = '';
      // let name = "";
      let topic_split = [];
      let lp_id_inserted = [];
      if (snapshot.child(completedLp).hasChild('Owner')) {
        owner = snapshot
          .child(completedLp)
          .child('Owner')
          .val();
        snapshot.forEach(function(childSnap) {
          if (
            owner.length > 0 &&
            childSnap.hasChild('Owner') &&
            childSnap
              .child('Owner')
              .val()
              .toLowerCase()
              .indexOf(owner.toLowerCase()) != -1
          ) {
            if (
              !lps_compelted.includes(childSnap.key) &&
              !lp_id_inserted.includes(childSnap.key)
            ) {
              // not already completed -> need to suggest
              resp.push([childSnap.key, childSnap.val()]);
              lp_id_inserted.push(childSnap.key);
            }
          }
        });
      }
      if (snapshot.child(completedLp).hasChild('Topic')) {
        topic = snapshot
          .child(completedLp)
          .child('Topic')
          .val();
        // looks like topic is stored as a ', ' seperated string (will not change this now, since might mess up something someone else implemented)
        topic_split = topic.split(', ');
        snapshot.forEach(function(childSnap) {
          for (var t of topic_split) {
            if (
              t.length > 0 &&
              childSnap.hasChild('Topic') &&
              (childSnap
                .child('Topic')
                .val()
                .toLowerCase()
                .indexOf(t.toLowerCase()) != -1 ||
                t.toLowerCase().indexOf(
                  childSnap
                    .child('Topic')
                    .val()
                    .toLowerCase()
                ) != -1)
            ) {
              if (
                !lps_compelted.includes(childSnap.key) &&
                !lp_id_inserted.includes(childSnap.key)
              ) {
                // not already completed -> need to suggest
                resp.push([childSnap.key, childSnap.val()]);
                lp_id_inserted.push(childSnap.key);
                break;
              }
            }
          }
        });
      }
      // do I need to check for name, as name can be arbitrary...?
      // if(snapshot.child(completedLp).hasChild("Name")) {
      //   name = snapshot.child(completedLp).child("Name").val();
      // }
    });
  });
  return response.status(200).json(resp);
});

// fetch similar lps to ones others that have similar interests to me have completed
// first fetch my interests, then get LPs that other users that have the some of my interests have completed
app.get('/student/:user_id/similarOthers', async (request, response) => {
  const lpRef = admin.database().ref(`/Learning_Paths`);
  const userRef = admin.database().ref(`/Users`);
  let uid = request.params.user_id;
  // get LPs user with uid has completed
  let interests = [];
  let lps_suggested = [];
  await userRef.once('value', function(snapshot) {
    if (snapshot.hasChild(uid)) {
      if (snapshot.child(uid).hasChild('Interests')) {
        // student has at least 1 interest
        snapshot
          .child(uid)
          .child('Interests')
          .forEach(function(intSnap) {
            interests.push(intSnap.val());
          });
      } else {
        // student not enrolled in any lps
        return response.status(400).json({
          message: `User with id: ${uid} Does not have any interests.`
        });
      }
    } else {
      // User does not exist
      return response.status(400).json({
        message: `User with id: ${uid} not found.`
      });
    }
    // find users with similar interests
    snapshot.forEach(function(childSnapshot) {
      if (childSnapshot.key.indexOf(uid) == -1) {
        if (childSnapshot.hasChild('Interests')) {
          var interestMatch = false;
          childSnapshot.child('Interests').forEach(function(interestSnap) {
            interests.forEach(element => {
              if (
                JSON.stringify(interestSnap.val())
                  .toLowerCase()
                  .indexOf(element.toLowerCase()) != -1
              ) {
                interestMatch = true;
              }
            });
          });
          if (interestMatch) {
            // suggest LPs that this user has completed
            // check if childSnap has completed lps
            if (childSnapshot.hasChild('Student/LP_Enrolled')) {
              childSnapshot
                .child('Student/LP_Enrolled')
                .forEach(function(lpSnap) {
                  if (
                    lpSnap
                      .child('LP_Status')
                      .val()
                      .indexOf('Complete') != -1
                  ) {
                    if (!lps_suggested.includes(lpSnap.key)) {
                      lps_suggested.push(lpSnap.key);
                    }
                  }
                });
            }
          }
        }
      }
    });
  });
  let resp = lps_suggested;
  return response.status(200).json(resp);
});

exports.route = app;
