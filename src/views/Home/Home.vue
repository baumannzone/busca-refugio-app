<template>
  <div class="home">
    <v-app>
      <v-container>
        <v-snackbar
            color="success"
            :timeout="6000"
            top
            right
            v-model="snackbar"
        >
          {{ textoAviso }}
          <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>

        <!--<ul>
          <li v-for="user in users" :key="user.id">
            <p>{{ user.id }} - {{ user.battleTag }}</p>
          </li>
        </ul>-->

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
              label="Battle-tag"
              v-model="name"
              :rules="nameRules"
              required>
          </v-text-field>
          <!--<v-text-field-->
              <!--label="E-mail"-->
              <!--v-model="email"-->
              <!--:rules="emailRules"-->
              <!--required>-->
          <!--</v-text-field>-->
          <v-btn @click="submit" color="info">Comprobar</v-btn>
        </v-form>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  // @ is an alias to /src
  import service from '@/services/index';

  export default {
    name: 'home',
    created() {
      this.getUsers();
    },
    data() {
      return {
        snackbar: false,
        textoAviso: '',
        users: [],
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Battle-tag is required',
          // v => ( v && v.length <= 10 ) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          // v => !!v || 'E-mail is required',
          // v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test( v ) || 'E-mail must be valid',
        ],
      };
    },
    methods: {
      getUserByBattleTag( tag ) {
        service.getUserByBattleTag( tag )
          .then( ( res ) => {
            console.debug( res.data );
            if ( res.data.guildName === 'Busca Refugio' ) {
              this.textoAviso = `El usuario ${res.data.battleTag} pertenece al CLAN`;
              this.snackbar = true;
            }
          } )
          .catch( ( err ) => {
            console.debug( err );
            console.debug( 'ERRRR' );
          } );
      },
      getUsers() {
        service.getUsers()
          .onSnapshot( ( querySnapshot ) => {
            this.users = [];
            querySnapshot.forEach( ( doc ) => {
              this.users.push( { id: doc.id, ...doc.data() } );
            } );
          } );
      },
      submit() {
        if ( this.$refs.form.validate() ) {
          const arr = this.name.split( '#' );
          let tag = this.name;
          if ( arr.length === 2 ) {
            tag = `${arr[ 0 ]}-${arr[ 1 ]}`;
            this.getUserByBattleTag( tag );
          }
          else {
            console.debug( 'formato incorrecto' );
          }
        }
      },
      deleteUser( id ) {
      },
    },
  };
</script>
