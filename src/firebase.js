import firebase from 'firebase/app';
// import firestore from 'firebase/firestore'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyALLNgbO90JdMI7G_6ElvBukG0wZsDLfNg",
  authDomain: "auth-fb-b2e63.firebaseapp.com",
  databaseURL: "https://auth-fb-b2e63.firebaseio.com",
  projectId: "auth-fb-b2e63",
  storageBucket: "auth-fb-b2e63.appspot.com",
  messagingSenderId: "674396959802",
  appId: "1:674396959802:web:9caa254a5b30c90bf6f103"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const dbFirebase = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export { firebaseApp, firebase, dbFirebase, auth, storage };