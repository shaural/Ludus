const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

function validate_input(topic, name,owner ){
    if(topic === undefined || name === undefined || owner === undefined){
        console.log("undefined data")
        return false;
    }
    else if(topic.toString().length == 0 || name.toString().length == 0 || owner.toString().length == 0){
         console.log("zero-length string")
        return false;
    }
    return true;
}

exports.create_learning_path = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        switch (request.method) {
            case('POST'):
                const {
                    // lpid,
                    topic,
                    lpname,
                    owner,

                    //NOTE: URL will be hardcoded for testing purposes, change the variable
                    //as needed
                    //in production code, this part will be called by the frontend page
                    //which then will pass in our actual URL
                    url = "https://ludus.com/users/12313122/teacher/testteacher",

                    //for now, these parts will be null until a class gets added
                    //to a learning path
                    ClassList = null,
                    StudentsEnrolled = null,
                    Teachers_who_recommend = null

                } = request.body
                console.log(lpname, topic,owner)
                if(validate_input(topic,lpname,owner) == false){
                    return response.status(400).json({
                        message: 'Something went wrong, undefined data was passed in!'
                    })
                }

            //parse url to find users id and teacher
            //this part will be unused, for now
            let url_tokens = url.split('/')
            let user_id = null;
            let teacher = null;
                for(var i = 0; i < url_tokens.length; i++){
                    if(url_tokens[i] == 'users'){
                        user_id = url_tokens[i+1];
                    }
                    else if(url_tokens[i] == 'teacher'){
                        teacher = url_tokens[i+1];
                        break;
                    }
                }
                
                const database = admin.database().ref('/Learning_Paths');
                database.set({
                        'Topic': topic,
                        'Name': lpname,
                        'Owner': owner,
                        'Class_List': null,
                        'St_Enrolled': null,
                        'T_recommend': null
                })
                return response.status(200).json({
                    message: 'Created a new learning path!'
                })
            }
            })
        })