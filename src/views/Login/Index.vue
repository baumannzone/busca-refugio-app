<template>
  <section class="login-form">
    <v-form v-model="loginForm" ref="loginForm">
      <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
      <v-text-field label="Password" v-model="password" :rules="passwordRules" required type="password"></v-text-field>
      <v-btn @click="submitLoginForm" :disabled="!loginForm">Click</v-btn>
    </v-form>
  </section>
</template>

<script>
  import service from '@/services/auth';

  export default {
    data() {
      return {
        loginForm: false,
        email: '',
        emailRules: [
          v => !!v || 'Email is required',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
        ],
      };
    },
    methods: {
      submitLoginForm() {
        if ( this.$refs.loginForm.validate() ) {
          this.logInUser( this.email, this.password );
        }
      },
      logInUser( email, pass ) {
        service.logInUser( email, pass )
          .then( ( res ) => {
            this.$store.commit( 'logUserIn', res );
            this.$router.push( { name: 'Home' } );
          } )
          .catch( ( error ) => {
            // Handle Errors here.
            this.$store.commit( 'logUserOut' );
            const errorCode = error.code;
            const errorMessage = error.message;
            console.debug( errorCode );
            console.debug( errorMessage );
          } );
      },
    },
  };
</script>

<style lang="stylus"></style>
