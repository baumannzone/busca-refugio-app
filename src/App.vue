<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed clipped v-model="drawer" app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

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

  export default {
    name: 'app',
    components: {},
    data() {
      return {
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
  };
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50

</style>
