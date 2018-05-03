<template>
  <section class="login">
    <h1>Logeado: {{ isLoggedIn }}</h1>
    <v-form v-model="valid">
      <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
      <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
    </v-form>
    <v-btn @click="logInUser">Click</v-btn>
  </section>
</template>

<script>
  import service from '@/services/auth';
  import { mapGetters } from 'vuex';

  export default {
    async created() {
      console.debug( 'Created..' );
    },
    data() {
      return {
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Username is required',
        ],
        email: '',
        emailRules: [
          v => !!v || 'Password is required',
        ],
      };
    },
    methods: {
      logInUser() {
        service.logInUser( 'admin@baumannzone.com', '123123' )
          .then( ( res ) => {
            // const { user } = result;
            console.debug( 'User Data:' );
            console.debug( Object.keys( res ) );
            console.debug( res );
            this.$store.commit( 'logUserIn', res );
          } )
          .catch( ( error ) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.debug( errorCode );
            console.debug( errorMessage );
          } );
      },
    },
    computed: {
      ...mapGetters( {
        isLoggedIn: 'isUserLoggedIn',
      } ),
    },
  };
</script>

<style lang="stylus">
  .hero-list
    list-style none
    li
      display inline-block
      width 150px
      height 100px
</style>
