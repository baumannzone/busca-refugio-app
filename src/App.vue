<template>
  <v-app id="d3-clan-app">
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <template v-if="isLogged">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon color="orange darken-2">perm_identity</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ userEmail }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile v-for="(item, index) in drawerItems" @click="navigateTo(item.to)" :key="index">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Busca Refugio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <LastUpdate :hour="hour"/>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-heigth layout align-center justify-center>
        <div class="flex xs10">
          <router-view></router-view>
        </div>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <v-btn flat icon color="indigo lighten-1" @click="navigateTo('Login')">
        <v-icon>security</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import service from '@/services/index';
  import LastUpdate from '@/components/LastUpdate.vue';

  export default {
    name: 'app',
    components: { LastUpdate },
    created() {
      service.getLastUpdate()
        .then( ( doc ) => {
          if ( doc.exists ) {
            this.lastUpdate = doc.data().date;
          }
          else {
            // doc.data() will be undefined in this case
            console.debug( 'No such document!' );
          }
        } )
        .catch( ( err ) => {
          console.debug( err );
        } );
    },
    data() {
      return {
        lastUpdate: null,
        drawer: false,
        drawerItems: [
          { title: 'Inicio', icon: 'home', to: 'Home' },
          { title: 'Registrar Battle-Tag', icon: 'person_add', to: 'BattleTag-Create' },
        ],
      };
    },
    methods: {
      navigateTo( to ) {
        this.$router.push( { name: to } );
      },
    },
    computed: {
      hour() {
        return this.$moment( this.lastUpdate ).format( 'HH:mm' );
      },
      ...mapGetters( {
        isLogged: 'isUserLogged',
        userEmail: 'loggedUserEmail',
      } ),
    },
  };
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
</style>
