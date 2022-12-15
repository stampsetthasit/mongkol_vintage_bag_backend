// Connect to Firebase and Firestore
// https://firebase.google.com/docs/web/setup

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const { initializeApp } = require("firebase-admin/app")
const { getAuth } = require('firebase-admin/auth');


// Add Firebase SDK Snippet
const firebaseConfig = {
  apiKey: "AIzaSyD03DJnP8_klFhwrq6IIk0q1NGu53oGEHA",
  authDomain: "mongkolvintagebag.firebaseapp.com",
  projectId: "mongkolvintagebag",
  storageBucket: "mongkolvintagebag.appspot.com",
  messagingSenderId: "59105595626",
  appId: "1:59105595626:web:c00e592788b80eb7a70793",
  measurementId: "G-YTJ955G9ZN"
};

firebase.initializeApp(firebaseConfig);

const mongkolFirebaseAdminApp = initializeApp(firebaseConfig)
const mongkolGetAuth = getAuth(mongkolFirebaseAdminApp);
global.mongkolGetAuth = mongkolGetAuth; //Global for other files to use this method


module.exports = firebase;
