const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.database().ref('/Users');
const cors = require('cors')({origin: true});

exports.accounts = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        switch (request.method) {
            case('POST'):
                const {
                    name,
                    password,
                    email,
                    dob
                } = request.body

                //basic validation tests

                if(!email.toString().includes('@')){
                    return response.status(400).json({
                        message: 'Invalid email, please try again'
                    })
                }

                else if(!password.toString().length){
                    return response.status(400).json({
                        message: 'Empty passwords are not allowed, please try again'
                    })
                }

                else if(password.toString().length < 10){
                    return response.status(400).json({
                        message: 'Minimum password length: 10 characters, please try again'
                    })
                }

                else if(!name.toString().length){
                    return response.status(400).json({
                        message: 'You may not have an empty name'
                    })
                }
                //this will be obselete with HTML forms
                // placeholder for testing purposes

                else if(!dob.toString().length){
                    return response.status(400).json({
                        message: 'Please enter your age'
                    })
                }

                else{
                    database.set({
                        'Name':name,
                        'Password':password,
                        'Email':email,
                        'DoB':dob
                });

                return response.status(200).json({
                    message: 'User created'
                })
            }

            default:

                // unsupported method

                return response.status(405).json({
                    message: 'Method not allowed!'
                });
         }

        });
    });
