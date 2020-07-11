import firebase from "firebase/app"; // get the utils we need not all of it
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
  measurementId: "G-YPJ8B1MGGC",
};

firebase.initializeApp(config);

// 'userAuth' is the user object we get when signing in such as the current user
// 'additional data' any other data that we might pass in as an object
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if user auth object doesnt exist
  if (!userAuth) return;

  // reference to the current user object in user collection in firestore
  const userRef = firestore.doc(`user/${userAuth.uid}`);

  // get the current user object from firestore
  const snapshot = await userRef.get();

  // if the current user object exist create new a new user from the data of our userAuth object
  if (!snapshot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{

      await userRef.set({
        displayName,
        email,
        createdAt,
        // spread it as it is an object
        ...additionalData
      })

    }catch(error){
      console.log("error creating user", error.message)
    }
  }

  // might use it in our code for something
  return userRef;
};

// use to add collection and documents to firestore automatically when called instead of doing it manually
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionref = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj =>{
    // give me a random new collection document with random id
    const newDocRef = collectionref.doc();

    // batch all teh calls togather
    batch.set(newDocRef, obj);
  })

  // will fire all teh batch calls
  // also a promise such as successed
  return await batch.commit();

}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google authentication
const provider = new firebase.auth.GoogleAuthProvider();
// triger google pop up when we use google auth provider
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
