const functions = require('firebase-functions');
exports.users = functions.https.onRequest(require('./users').route);
exports.learningPath = functions.https.onRequest(
  require('./learning_path').route
);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
