<template>
  <section class="clan-edit">
    <h1>Gestión de rangos del Clan</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index" @click="openModal(user)">{{ user.id }}</li>
    </ul>

    <v-dialog v-model="dialog2" max-width="500px" v-if="selectedUser">
      <v-card>
        <v-card-title>Editando: {{ selectedUser.bnetData.battleTag }}</v-card-title>
        <v-card-text>
          <pre>{{selectedUser.clanData}}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="dialog2=false">Cancelar</v-btn>
          <v-btn color="primary" @click.stop="dialog2=false">Guardar cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import service from '@/services/index';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        users: [],
        selectedUser: null,
        dialog2: false,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        service.getUsers()
          .then( ( querySnapshot ) => {
            querySnapshot.forEach( ( doc ) => {
              // Convertir de User#1234 a User-1234
              const arr = doc.id.split( '#' );
              const tagWeb = `${arr[ 0 ]}-${arr[ 1 ]}`;
              this.users.push( { id: doc.id, ...doc.data(), tagWeb } );
            } );
          } )
          .catch( ( err ) => {
            console.debug( err );
          } );
      },
      updateClanRange( id ) {
        const data = {
          updated: new Date(),
          webApp: {
            isAdmin: true,
            range: 1, // 0, 1
          },
          clan: {
            isAdmin: true,
            range: 2, // 0, 1, 2
          },
        };
        service.setClanRange( data, id );
      },
      openModal( user ) {
        this.selectedUser = user;
        this.dialog2 = true;
      },
    },
    computed: {
      ...mapGetters( {
        isLogged: 'isUserLogged',
      } ),
    },
  };
</script>

<style lang="stylus" scoped>
</style>
