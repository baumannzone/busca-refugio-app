<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed clipped v-model="drawer" app>
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
    </v-toolbar>
    <v-content>
      <v-container fluid fill-heigth layout align-center justify-center>
        <div class="flex xs10">
          <router-view></router-view>
        </div>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text"> &nbsp; <a href="https://twitter.com/baumannzone">@baumannzone</a> &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        drawer: false,
        drawerItems: [
          { title: 'Inicio', icon: 'home', to: 'Home' },
          { title: 'Registrar Battle-Tag', icon: 'person_add', to: 'BattleTag-Create' },
          { title: 'Repositorio', icon: 'code', to: 'Repository' },
          { title: 'Login', icon: 'security', to: 'Login' },
        ],
      };
    },
    methods: {
      navigateTo( to ) {
        this.$router.push( { name: to } );
      },
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
