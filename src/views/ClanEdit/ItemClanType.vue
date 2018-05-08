<template>

  <div class="clan-item">
    <template v-if="type === 'clan'">
      <v-chip color="blue-grey" text-color="black" small outline>
        <!--<v-avatar class="green darken-4">{{ data.range }}</v-avatar>-->
        {{ clanUserType }}
      </v-chip>
    </template>
    <template v-if="type === 'webApp'">
      <v-chip color="blue-grey" text-color="black" small outline>
        <!--<v-avatar class="green darken-4">{{ data.range }}</v-avatar>-->
        {{ webAppUserType }}
      </v-chip>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'itemClanType',
    props: {
      data: {
        required: true,
        type: Object,
      },
      type: {
        required: true,
        type: String,
      },
    },
    computed: {
      clanUserType() {
        const ranges = [
          '-',
          'Oficial',
          'Líder',
        ];
        return ranges[ this.data.range ];
      },
      webAppUserType() {
        const ranges = [
          '-',
          'Admin',
          'Root',
        ];
        return ranges[ this.data.range ];
      },
    },
  };
</script>
<style lang="stylus" scoped>

</style>
