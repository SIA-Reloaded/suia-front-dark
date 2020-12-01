import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlCJ7HFyYQ_138Za1X2PSKEr4SGOq0cWA",
  authDomain: "suia-dark-side.firebaseapp.com",
  databaseURL: "https://suia-dark-side.firebaseio.com",
  projectId: "suia-dark-side",
  storageBucket: "suia-dark-side.appspot.com",
  messagingSenderId: "547286189036",
  appId: "1:547286189036:web:8ce48a1c5b74066c9436c9"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
