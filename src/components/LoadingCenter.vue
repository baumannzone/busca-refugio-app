<template>
  <div class="loading">
    <v-progress-circular indeterminate color="primary" :size="50" :width="5"></v-progress-circular>
  </div>
</template>
<script>
  export default {
    name: 'LoadingCenter',
  };
</script>
<style lang="stylus">
  .loading
    display flex
    justify-content center
</style>
