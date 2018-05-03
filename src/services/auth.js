// import axios from 'axios';
import { auth } from '../config/firebase';

export default {
  logInUser( email, password ) {
    return auth.signInWithEmailAndPassword( email, password );
  },
};
