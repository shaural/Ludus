const functions = require('firebase-functions');
exports.accounts = require('./accounts').accounts;
exports.create_learning_path = require('./learning_path').create_learning_path;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
