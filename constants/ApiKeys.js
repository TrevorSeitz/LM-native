import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = {};
// Initialize Firebase
// export default {
// var firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyAdb-VyzqskSDW_vxh984z7elcmNkPOYts",
  src: "https://www.gstatic.com/firebasejs/5.9.1/firebase.js",
  authDomain: "ellmoe.firebaseapp.com",
  databaseURL: "https://ellmoe.firebaseio.com",
  projectId: "ellmoe",
  storageBucket: "ellmoe.appspot.com",
  messagingSenderId: "774360750184"
};

// Create a reference with an initial file path and name
// var storage = firebase.storage();
// var pathReference = storage.ref('images/stars.jpg');

// GOOGLE_MAPS_KEY = AIzaSyCm0e573jedm5MrvvFU38TlKKe1Hu1qi98;

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

// firebase
//   .auth()
//   .signInAnonymously()
//   .then(credential => {
//     if (credential) {
//       console.log("default app user ->", credential.user.toJSON());
//     }
//   });

export default firebase;
