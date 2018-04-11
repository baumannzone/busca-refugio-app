import axios from 'axios';
import d3 from '../config/d3';
import db from '../config/firebase';

// Axios
axios.defaults.baseURL = d3.url;
axios.defaults.params = {};
axios.defaults.params.locale = d3.locale;
axios.defaults.params.apikey = d3.apikey;

export default {
  getUserByBattleTag( tag ) {
    return axios.get( `profile/${tag}/` );
  },
  addBattleTag( tag ) {
    console.debug( tag );
  },

  getUsers() {
    return db.collection( 'users' );
  },
};
