// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const dotenv = require("dotenv");

dotenv.config(); //searchs .env file

// Your web app's Firebase configuration
const Config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};


// Initialize Firebase
//const Firebase = firebase.initializeApp(Config);
firebase.initializeApp(Config);


module.exports = firebase;