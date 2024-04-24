const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateFirestore = functions.region('us-central1').runWith({memory: '128MB'}).https.onCall((data, context) => {
  if (!context.auth || !context.auth.uid) {
    return;
  }
  // Update every user document in firestore, this method also allows you to use the users previous values (inside the loop) with: userDoc.data().{field name}
  const db = admin.firestore();
  let userSnapshots = await db.collection('users').get();
  for (userDoc in userSnapshots.docs) {
    let userRef = db.collection("users").doc(userDoc.id);
    userRef.update({
      // Add the parameters you want to edit here
    })
  }
  
  // Update, create or delete an single document (assuming you have a string parameter to your cloud function called "userRef"):
  const db = admin.firestore();
  let userRef = db.collection("users").doc(data.userRef)
  
  // Update
  userRef.update({
    // Add field value pairs here
  })
  
  // Delete
  userRef.delete()
  
  // Create (cloud function needs to be async)
  let userRef = await db.collection("users").add({
    // Add field value pairs here
  });
});
