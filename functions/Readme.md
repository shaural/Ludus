# Firebase Functions

This directory contains the source code for Ludus's API functions.

## Creating an endpoint

1. Install modules locally by running `npm i` in this directory
2. Make sure that the `cors` module is installed by running `npm i --save cors`
3. If necessary, create a file that will keep related endpoints together
4. Your file should look something like this:
```js
const functions = require('firebase-functions');

// set up CORS (cross-origin resource sharing)
const cors = require('cors')({origin: true});

// set up google admin API
const admin = require('firebase-admin');
admin.initializeApp();

// set up database
// change the ref to the appropriate database key
const database = admin.database().ref('/users');

// add your endpoint
exports.myEndpoint = functions.https.onReques((request, response) => {
    return cors(request, response, () => {
        // handle different methods as required by the endpoint (you don't need all of these, this is an example)
        switch (request.method) {
            case 'POST':
                // handle POST method (usually creating new item)
                break;
            case 'GET':
                // handle GET method (usually list all or get specific item)
                break;
            case 'PATCH':
                // handle PATCH method (partial update)
                break;
            case 'DELETE':
                // handle DELETE method (delete item)
                break;
            default:
                // unsupported method
                return res.status(405).json({
                    message: 'Method not allowed!'
                });
        }
    });
});
```
5. Add your endpoint to index.js:
```js
// assuming your endpoint is defined in file 'myEndpoint.js'
exports.myEndpoint = require('./myEndpoint').myEndpoint;
```

## Testing an endpoint

There are a couple options. You can run `firebase serve`, which will serve the functions using a small HTTP server that you can test by sending requests to `localhost:3000` or similar. You can also start a shell, where you'll be able to invoke the functions directly. For more information, see [this docs page](https://firebase.google.com/docs/functions/local-emulator).

## Publishing an endpoint

Once you've made your endpoint (and tested it), you can publish it to firebase by running `firebase deploy --only functions`

## More information

See [the getting started guide](https://firebase.google.com/docs/functions/get-started?authuser=0)
