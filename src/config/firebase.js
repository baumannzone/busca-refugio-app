import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import settings from './settings';

const firebaseApp = firebase.initializeApp( settings );

// export const db = firebaseApp.firestore();
// export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebaseApp.auth();
export default firebaseApp.firestore();
