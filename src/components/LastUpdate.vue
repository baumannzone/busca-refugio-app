<template>
  <div class="last-update" v-if="hour">
    <v-tooltip left>
      <span slot="activator">
        <v-icon>update</v-icon>
      </span>
      <span>La última actualización de datos fue a las {{ timeInHours }}</span>
    </v-tooltip>
  </div>
</template>
<script>
  export default {
    name: 'LastUpdate',
    props: {
      hour: {
        required: true,
      },
    },
    computed: {
      timeInHours() {
        return `${this.hour} hs`;
      },
    },
  };
</script>

<style lang="stylus">
  .last-update
    display flex
    align-items center
</style>
