import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = {};
// Initialize Firebase
// export default {
// var firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyBybytYwjFRxcyL410pnwxbkMDMA8Df4KM",
  src: "https://www.gstatic.com/firebasejs/5.8.0/firebase.js",
  authDomain: "manager-8ccf4.firebaseapp.com",
  databaseURL: "https://manager-8ccf4.firebaseio.com",
  projectId: "manager-8ccf4",
  storageBucket: "manager-8ccf4.appspot.com",
  messagingSenderId: "535943620965"
};

// Create a reference with an initial file path and name
// var storage = firebase.storage();
// var pathReference = storage.ref('images/stars.jpg');

// GOOGLE_MAPS_KEY = AIzaSyCm0e573jedm5MrvvFU38TlKKe1Hu1qi98;

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

firebase
  .auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log("default app user ->", credential.user.toJSON());
    }
  });

export default firebase;
