<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer fixed v-model="asdasd" app>
        <v-list dense>
          <v-list-tile @click="null">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="null">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        hola
      </v-container>
    </v-app>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'home',
    components: {},
    data() {
      return {
        asdasd: 'gg',
      };
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
