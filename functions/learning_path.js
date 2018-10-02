const admin = require('./utils').firebaseAdmin;

const app = require('express')();
app.use(require('cors')({ origin: true }));

function validate_input(topic, name, owner) {
  if (topic === undefined || name === undefined || owner === undefined) {
    // console.log("undefined data")
    return false;
  } else if (
    !topic.toString().length &&
    !name.toString().length &&
    !owner.toString().length
  ) {
    //  console.log("zero-length string")
    return false;
  }
  return true;
}

app.post('/', (request, response) => {
  const {
    // lpid,
    topic,
    lpname,
    owner,
    ClassList = null,
    StudentsEnrolled = null,
    Teachers_who_recommend = null
  } = request.body;
  // console.log(lpname, topic,owner)
  if (!validate_input(topic, lpname, owner)) {
    return response.status(400).json({
      message: 'Something went wrong, undefined data was passed in!'
    });
  }

  const database = admin.database().ref('/Learning_Paths');
  database.set({
    Topic: topic,
    Name: lpname,
    Owner: owner,
    Class_List: ' ',
    St_Enrolled: ' ',
    T_recommend: ' '
  });

  return response.status(200).json({
    message: 'Created a new learning path!'
  });
});

app.post('/lp_id/class', (request, response) => {
  const db = admin
    .database()
    .ref(`/Learning_Paths/${request.params.lp_id}/class`);
  if (!db)
    return response
      .status(404)
      .json({ message: ` ${request.params.lp_id} does not have any classes` });
  const classes = db.Class_List;
  const out = [];
  for (c of classes) {
    out.push(c);
  }
  return response.status(200).json(out);
});

exports.route = app;
