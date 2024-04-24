const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios'); // Remember to add axios to your package.json file

exports.axiosRequest = functions.region('us-central1').runWith({memory: '128MB'}).https.onCall((data, context) => {
		if (!context.auth || !context.auth.uid) {
      return;
    }
    // Write your code below!
  
    // Make a GET Request
    const url = "https://example.com/api/test";
    const config = {
      params: {},
      headers: {}
    };
    try {
      const response = await axios.get(url, config);
      return response.status>=200 && response.status<300;
    }
    catch (error) {
      return false;
    }

  
    // Make a POST Request
    const url = "https://example.com/api/test";
    const params= {},
    const config = {
      headers: {}
    };
    try {
      const response = await axios.post(url, params, config);
      return response.status>=200 && response.status<300;
    }
    catch (error) {
      return false;
    }

    // Write your code above!
  }
);
