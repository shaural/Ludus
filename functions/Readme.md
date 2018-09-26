# Firebase Functions

This directory contains the source code for Ludus's API functions.

## Creating an endpoint

1. Install modules locally by running `npm i` in this directory
2. Make sure that the `cors` and `epxress` modules are installed by running `npm i cors express`
3. If necessary, create a file that will keep related endpoints together
4. Your file should look something like this:
```js
const functions = require('firebase-functions');

// set up express app for routing
const app = require('express')();
// use CORS middleware on all routes of app
app.use(require('cors')({origin: true}));

// set up google admin API
const admin = require('firebase-admin');
admin.initializeApp();

// set up database
// change the ref to the appropriate database key
const database = admin.database().ref('/Key');

// add your endpoints

// NOTE: each method takes as its first parameter a relative URL. this means
//       the final URL for this example would look something like:
//       https://https://us-central1-ludusfire.cloudfunctions.net/endpoint/
app.post('/', (request, response) => {
  // TODO: implement POST method
  return response.status(501).json({
    message: 'method not implemented'
  });
});

// NOTE: same URL as above, different method (GET vs POST)
app.get('/', (request, response) => {
  // TODO: implement GET method (for all records)
  return response.status(501).json({
    message: 'method not implemented'
  });
});

// NOTE: as mentioned above, the route specified here is relative. in this case,
//       the final URL for this example would look something like:
//       https://https://us-central1-ludusfire.cloudfunctions.net/endpoint/1232
//       where '1232' is the record ID
app.get('/:record_id', (request, response) => {
  // TODO: implement GET method (for specific record)
  const { record_id } = req.params; // pull record_id out of URL

  return response.status(501).json({
    message: 'method not implemented'
  });
});

// export app
exports.route = app;
```
5. Add your endpoint to index.js:
```js
const functions = require('firebase-functions');

// assuming your endpoint is defined in file 'myEndpoint.js', tell firebase to
// use the express app you defined as the function
exports.myEndpoint = functions.https.onRequest(require('./myEndpoint').route);
```

## Testing an endpoint

There are a couple options. You can run `firebase serve`, which will serve the functions using a small HTTP server that you can test by sending requests to `localhost:3000` or similar. You can also start a shell, where you'll be able to invoke the functions directly. For more information, see [this docs page](https://firebase.google.com/docs/functions/local-emulator).

## Publishing an endpoint

Once you've made your endpoint (and tested it), you can publish it to firebase by running `firebase deploy --only functions`

## More information

See [the getting started guide](https://firebase.google.com/docs/functions/get-started?authuser=0)
