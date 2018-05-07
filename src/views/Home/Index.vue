<template>
  <div class="main-page">
    <template v-if="isUserDataLoding">
      <LoadingCenter/>
    </template>
    <template v-else>
      <div class="main-table">
        <v-data-table
          :headers="headers" :items="users" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>
              <b>{{ props.item.id }}</b>
            </td>
            <td>
              <ul class="hero-list">
                <li v-for="(hero, index) in props.item.heroes" :key="index">
                  <heroPortraitBox :hero="hero" :tag-web="props.item.tagWeb"/>
                </li>
              </ul>
            </td>
          </template>
        </v-data-table>
      </div>
    </template>
  </div>
</template>

<script>
  import service from '@/services/index';
  import LoadingCenter from '@/components/LoadingCenter.vue';
  import HeroPortraitBox from '@/components/HeroPortraitBox.vue';

  export default {
    name: 'home',
    components: { HeroPortraitBox, LoadingCenter },
    async created() {
      this.isUserDataLoding = true;
      await this.getUsersData();
      this.isUserDataLoding = false;
    },
    data() {
      return {
        isUserDataLoding: false,
        users: [],
        headers: [
          {
            text: 'BattleTag', align: 'left', sortable: true, value: 'battleTag',
          },
          // { text: 'Clan', value: 'clan' },
          { text: 'Heroes', value: '' },
          // { text: 'Heroes', value: '' },
        ],
      };
    },
    methods: {
      getUsersData() {
        return service.getUsers()
          .then( ( querySnapshot ) => {
            querySnapshot.forEach( ( doc ) => {
              // Convertir de User#1234 a User-1234
              const arr = doc.id.split( '#' );
              const tagWeb = `${arr[ 0 ]}-${arr[ 1 ]}`;
              // doc.data() is never undefined for query doc snapshots
              this.users.push( { id: doc.id, ...doc.data().bnetData, tagWeb } );
            } );
          } )
          .catch( ( err ) => {
            console.debug( err );
          } );
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .hero-list
    list-style none
    li
      display inline-block
      margin-bottom 15px
      margin-top 10px
      width 135px
</style>
