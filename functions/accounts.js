const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database().ref('/users');
const cors = require('cors')({origin: true});
//needed for request parsing
var bodyParser = require('body-parser');




exports.myEndpoint = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
         switch (request.method) {
            case('POST'):
                //parse JSON fields
                var inputName = request.body.name
                var hashedPassword = request.body.password
                var inputEmail = request.body.email

                //not sure if the right way to save DOB
                var inputDob = request.body.dob


                //TODO: Validate data before making object
                database.set({
                    inputName:{
                        database:Name = inputName,
                        database:password = hashedPassword,
                        database:Email = inputEmail,
                        database:DoB = inputDob
                    }
                });

                return response.status(200).json({
                    message: 'User created'
                })


            default:
                // unsupported method
                return response.status(405).json({
                    message: 'Method not allowed!'
                });


         }
        }
    )},
);
