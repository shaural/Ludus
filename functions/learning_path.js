const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

function validate_input(id,topic, name,owner ){
    if(id == "undefined" || topic == "undefined" || name == "undefined" || owner == "undefined"){
        return false;
    }
    if(!id.toString().length || !topic.toString().length || name.toString().length || owner.toString().length){
        return false;
    }
    return true;
}

exports.create_learning_path = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {
        switch (request.method) {
            case('POST'):
                const {
                    lpid,
                    topic,
                    name,
                    owner,
                    Class_List = null,
                    Students_Enrolled = null,
                    Teachers_who_recommend = null

                } = request.body
            }
            console.log("Body " + request.body)
            console.log(request.headers)
            // console.log(name, owner)
            console.log(lpid, name, Owner)
            if(validate_input(lpid,topic,name,owner) == false){
                return response.status(400).json({
                    message: 'Something went wrong, undefined data was passed in!'
                })
            }

            //parse url to find users id and teacher
            let url = request.url.toString()
            let url_tokens = url.split('/')
            let user_id = null;
            let teacher = null;
                for(var i = 0; i < url_tokens.length(); i++){
                    if(url_tokens[i] == 'users'){
                        user_id = url_tokens[i+1];
                    }
                    else if(url_tokens[i] == 'teacher'){
                        teacher = url_tokens[i+1];
                    }
                }
                
            const database = admin.database().ref('/Users/' + user_id +'/' + teacher + '/' + learningPaths);
            
                database.set({
                        'ID':lpid,
                        'Topic': topic,
                        'Name': name,
                        'Owner': owner,
                        'Class_List': null,
                        'Students_Enrolled': null,
                        'Teachers_who_recommend': null
                })
                return response.status(200).json({
                    message: 'Creating new learning path!'
                })

            })
        })