import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1jhAevBdttqiFm1vBzy7WcBR-tj16jxU",
  authDomain: "snapchat-react-redux.firebaseapp.com",
  projectId: "snapchat-react-redux",
  storageBucket: "snapchat-react-redux.appspot.com",
  messagingSenderId: "721544488802",
  appId: "1:721544488802:web:a55bd1090037e2796d6e3b",
  measurementId: "G-CDPVWXR15W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
