import firebase from "firebase/app" // get the utils we need not all of it
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDBpsrVU6NowTUEx0iyHY9QaaaRthuJX4I",
    authDomain: "e-commerce-react-5b9b5.firebaseapp.com",
    databaseURL: "https://e-commerce-react-5b9b5.firebaseio.com",
    projectId: "e-commerce-react-5b9b5",
    storageBucket: "e- commerce-react-5b9b5.appspot.com",
    messagingSenderId: "639699927597",
    appId: "1:639699927597:web:1ecca20cb77dec2553aea4",
    measurementId: "G-YPJ8B1MGGC"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // google authentication
  const provider = new firebase.auth.GoogleAuthProvider();
  // triger google pop up when we use google auth provider
  provider.setCustomParameters({prompt:"select_account"});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;