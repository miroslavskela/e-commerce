import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyDKStWdu1mDIge117sl9fpG5LlnO12AHxo",
  authDomain: "ecommerce2-9944d.firebaseapp.com",
  databaseURL: "https://ecommerce2-9944d.firebaseio.com",
  projectId: "ecommerce2-9944d",
  storageBucket: "ecommerce2-9944d.appspot.com",
  messagingSenderId: "869105617280",
  appId: "1:869105617280:web:f271463973dbb4d9d69965",
  measurementId: "G-1F8MN3R0XE"
};

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName, email, createdAt, ...additionalData
        })
      }catch(e){
        console.log("Error creating User", e)
      }
    }

    return userRef;
  }

  export const addCollectionAndDocuments = async  (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef)

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    })
   return await batch.commit();
  }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();
      return {
        routeName:encodeURI(title).toLowerCase(),
        id:doc.id,
        title, 
        items
      }
    });
   return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator
    }, {})
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;