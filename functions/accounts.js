const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database().ref('/users');
const cors = require('cors')({origin: true});

exports.myEndpoint = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
         switch (request.method) {
            case('POST'):
            const {
                name,
                password,
                email,
                dob
                } = request.body


                //console.log(inputName, hashedPassword, inputEmail, inputDob)

                //TODO: Validate data before making object
                database.set({
                    inputName:name,
                    hashedPassword:password,
                    inputEmail:email,
                    inputDob:dob
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
        
        });
    });
