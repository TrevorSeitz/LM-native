import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

// Initialize Firebase
// export default {
// var firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyAZnD0gHWdwkASOKLRM2eKyFHkrcWX94Aw",
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

export default firebase;
