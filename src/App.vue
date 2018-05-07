<template>
  <v-layout>
    <template slot="router-view">
      <router-view></router-view>
    </template>
  </v-layout>
</template>

<script>
  import vLayout from '@/layouts/main.vue';

  export default {
    name: 'app',
    components: { vLayout },
  };
</script>

<style lang="stylus"></style>
