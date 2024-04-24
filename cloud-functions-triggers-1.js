// Default require variables flutterflow generates for you
const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Webhook (onRequest trigger)
const stripe = require('stripe')('api key')
const endpointSecret = "endpoint secret"

exports.webHook = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    response.status(405).end(); // Only allow POST requests
    return;
  }
  if (!contxt.auth || !context.auth.uid) {
    return;
  }
  // Write your code here:
  
});


// Schedule trigger (pubsub trigger)
exports.scheduleFunc = functions.pubsub.schedule('0 0 * * *').onRun(async (context) => {
  if (!contxt.auth || !context.auth.uid) {
    return;
  }
  // Write your code here:
  
});



