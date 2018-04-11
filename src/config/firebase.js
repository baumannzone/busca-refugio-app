import firebase from 'firebase';
import 'firebase/firestore';
import settings from './settings';

const firebaseApp = firebase.initializeApp( settings );

// export const db = firebaseApp.firestore();
// export const auth = firebaseApp.auth();
// export const PROVIDER = new firebase.auth.GoogleAuthProvider();
// export default firebaseApp;
export default firebaseApp.firestore();
