const admin = require('./utils').firebaseAdmin;
const app = require('express')();

app.use(require('cors')({ origin: true }));

app.post('/', async (request, response) => {
  const db = admin.database().ref('/Users');

  const { name, password, email, dob } = request.body;

  //basic validation tests
  if (!email.toString().includes('@')) {
    return response.status(400).json({
      message: 'Invalid email, please try again'
    });
  } else if (!password.toString().length) {
    return response.status(400).json({
      message: 'Empty passwords are not allowed, please try again'
    });
  } else if (password.toString().length < 10) {
    return response.status(400).json({
      message: 'Minimum password length: 10 characters, please try again'
    });
  } else if (!name.toString().length) {
    return response.status(400).json({
      message: 'You may not have an empty name'
    });
  } else if (!dob.toString().length) {
    //this will be obselete with HTML forms
    // placeholder for testing purposes
    return response.status(400).json({
      message: 'Please enter your age'
    });
  } else {
    //firebase database entry creation
    let resp = {};
    await db
      .push({
        Name: name,
        Password: password,
        Email: email,
        DoB: dob
      })
      .once('value')
      .then(snapshot => {
        resp = {
          id: snapshot.key,
          user: { ...snapshot.val() }
        };
      });

    return response.status(200).json(resp);
  }
});

// https://example.com/api/accounts/12345/teacher
app.post('/:user_id/teacher', async (request, response) => {
  const db = admin.database().ref(`/Users/${request.params.user_id}/Teacher`);
  if (!db)
    return response
      .status(404)
      .json({ message: `user with id ${request.params.user_id} not found` });

  const { bio } = request.body;

  await db.set({
    Bio: bio || ''
  });
  return response.status(200).json();
});

app.post('/:user_id/student', async (request, response) => {
  const db = admin.database().ref(`/Users/${request.params.user_id}/Student`);
  if (!db)
    return response
      .status(404)
      .json({ message: `user with id ${request.params.user_id} not found` });

  const { name } = request.body;
  if (!name)
    return response
      .status(400)
      .json({ message: 'You may not have an empty name' });
  await db.set({
    Nickname: name,
    Interests: [],
    LP_Enrolled: [],
    T_Following: []
  });
  return response.status(200).json();
});

// Get all learning paths associated with a student
app.get('/:user_id/student/learningPaths', async (request, response) => {
  // console.log('Executed get all lps function');
  const db = admin
    .database()
    .ref(`/Users/`)
    .child(request.params.user_id);
  if (!db)
    return response.status(404).json({
      message: 'Unable to make reference to database'
    });
  // VERY IMPORTANT ASSUMPTION:
  // This function assums that each Student object has a child named
  // "LP_Enrolled" and that each instance of a learning path is contained as a child of LP_Enrolled
  // if this assumption is broken, the function will likely crash or return null values
  db.child('Student')
    .child('LP_Enrolled')
    .orderByValue()
    .on('value', function(snapshot) {
      const out = [];
      out.push(snapshot.val());
      try {
        return response
          .status(200)
          .json({ message: 'Got Learning paths', out });
      } catch (e) {
        response.status(400).json({
          e,
          message: 'Something went wrong getting the learning paths'
        });
      }
    });
});

// GET method (for all records)
app.get('/', (request, response) => {
  const userRef = admin.database().ref('/Users');
  userRef.once('value', function(snapshot) {
    return response.status(200).json(snapshot.val());
  });
});
// GET method (for user with user_id)
app.get('/:user_id', (request, response) => {
  const userRef = admin.database().ref(`/Users/${request.params.user_id}`);
  userRef.once('value', function(snapshot) {
    return response.status(200).json(snapshot.val());
  });
});

// Update user
app.patch('/:user_id', async (request, response) => {
  const uid = request.params.user_id;
  const { name, password, email, dob } = request.body;
  const userRef = admin
    .database()
    .ref(`/Users`)
    .child(uid);
  let resp;
  var updates = {};
  if (userRef) {
    if (name) {
      updates['Name'] = name;
    }
    if (password) {
      updates['Password'] = password;
    }
    if (email) {
      updates['Email'] = email;
    }
    if (dob) {
      updates['DoB'] = dob;
    }
    userRef.update(updates);
    userRef.once('value', function(snapshot) {
      return response.status(200).json(snapshot.val());
    });
  } else {
    return response
      .status(404)
      .json({ message: `user with id ${request.params.user_id} not found` });
  }
});

//delete user
app.delete('/:user_id', async (request, response) => {
  const userref = admin.database().ref(`/Users/${request.params.user_id}`);
  if (!userref)
    return response
      .status(404)
      .json({ message: `user with id ${request.params.user_id} not found` });

  //remove from db
  userref
    .remove()
    .then(function() {
      return response
        .status(200)
        .json({ message: `User with id ${request.params.user_id} deleted.` });
    })
    .catch(function(error) {
      console.log('Error deleting user:', error);
      return response.status(400).json({
        message: `Error, Could not delete user with id ${
          request.params.user_id
        }`
      });
    });
});

// shen282 Update Teacher API
app.patch('/:user_id/teacher', (request, response) => {
  const db = admin.database().ref(`/Users/${request.params.user_id}/Teacher`);
  if (!db)
    return response.status(404).json({
      message: 'user with id ${request.params.user_id} not found'
    });

  const { bio, nickName } = request.body;
  let updates = {};
  if (bio) updates['Bio'] = bio;
  if (nickName) updates['Nickname'] = nickName;

  db.update(updates);
  return response.status(200);
});

// shen282 Update Student API
app.patch('/:user_id/student', (request, response) => {
  const db = admin.database().ref(`/Users/${request.params.user_id}/Student`);
  if (!db)
    return response.status(404).json({
      message: 'user with id ${request.params.user_id} not found'
    });

  const { name } = request.body; //const { name, LP, teachers }
  let updates = {};
  if (name) updates['nickName'] = name;
  // how are we going to handle containing student specific information on lp's enrolled in, array?
  // firebase update can't append to array, only replace with a larger one
  // if(LP) updates['LP_Enrolled'] = ( `${request.params.user_id}_lp_enrolled` - old array, LP - pass in new array )?
  db.update(updates);
  return response.status(200);
});

app.post('/:user_id/teacher/learningPath', async (request, response) => {
  const {
    topic,
    name,
    ClassList = null,
    StudentsEnrolled = null,
    Teachers_who_recommend = null
  } = request.body;
  if (!(topic && topic.toString().length && (name && name.toString().length))) {
    return response.status(400).json({
      message: 'Something went wrong, undefined data was passed in!'
    });
  }

  const database = admin.database().ref('/Learning_Paths');
  let resp = {};
  await database
    .push({
      Topic: topic,
      Name: name,
      Owner: request.params.user_id,
      Class_List: [],
      St_Enrolled: [],
      T_recommend: []
    })
    .once('value')
    .then(snapshot => {
      resp = {
        id: snapshot.key,
        learning_path: { ...snapshot.val() }
      };
    });

  return response.status(200).json(resp);
});

// Mark class as complete for user, input: user_is, learning_path_id, class_id (I think we still need an enroll class for student function)
// Enrolled = 0, completed = 1
app.patch('/:user_id/:lp_id/:class_id', async (request, response) => {
  const db = admin.database().ref(
    `/Users/${request.params.user_id}/Student/lp_enrolled/${
      request.params.lp_id
    }`
    // }/${request.params.class_id}`
  );
  if (db) {
    let enrolledflg = 999; // 0: not enrolled, 1: enrolled+completed, 2: enrolled (not completed)
    // To verify if enrolled or already completed
    await db.once('value').then(function(snapshot) {
      if (snapshot.hasChild(`${request.params.class_id}`)) {
        const enrolledStatus = snapshot
          .child(`${request.params.class_id}`)
          .val();
        if (enrolledStatus == 1) {
          // Already marked as completed
          enrolledflg = 1;
        } else {
          enrolledflg = 2;
          db.child(`${request.params.class_id}`).set(1);
        }
      } else {
        // since class not in user => user not enrolled
        enrolledflg = 0;
      }
    });
    if (enrolledflg == 0) {
      // student not enrolled in class (or lp)
      return response.status(200).json({
        message: `Student not enrolled in class: ${
          request.params.class_id
        } of learning path ${request.params.lp_id}.`
      });
    } else if (enrolledflg == 1) {
      // student already completed class
      return response.status(200).json({
        message: `Student already complted class: ${
          request.params.class_id
        } of learning path ${request.params.lp_id}.`
      });
    } else if (enrolledflg == 2) {
      return response.status(200).json({ message: `Class marked completed.` });
    } else {
      return response
        .status(404)
        .json({ message: `Error for confirming enrollement.` });
    }
  } else {
    return response
      .status(404)
      .json({ message: `User with id ${request.params.user_id} not found` });
  }
});

exports.route = app;
