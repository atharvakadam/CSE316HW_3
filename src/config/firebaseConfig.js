import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAtNwtad1lkoVGuqvZFqvDSGPE3UgtcU1U",
    authDomain: "todo-hw3-9e0f6.firebaseapp.com",
    databaseURL: "https://todo-hw3-9e0f6.firebaseio.com",
    projectId: "todo-hw3-9e0f6",
    storageBucket: "todo-hw3-9e0f6.appspot.com",
    messagingSenderId: "167965849741",
    appId: "1:167965849741:web:11e31aaea6d002be290ac4",
    measurementId: "G-93V6KR1C4D"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;