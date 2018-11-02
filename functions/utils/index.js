const admin = require('firebase-admin');
admin.initializeApp({
  databaseURL: 'https://ludusfire.firebaseio.com',
  projectId: 'ludusfire',
  storageBucket: 'ludusfire.appspot.com'
});

exports.firebaseAdmin = admin;

const ref_has_child = async (ref, child) => {
  let found = false;
  await ref.child(child).once('value', snapshot => (found = snapshot.exists()));
  return found;
};
exports.ref_has_child = ref_has_child;
