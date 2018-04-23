<template>
  <div class="page">
    <h1>Main page</h1>
    <div class="main-table">
      <v-data-table
          :headers="headers"
          :items="users"
          hide-actions
          class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>
            {{ props.item.id }}
          </td>
          <td>{{ props.item.guildName }}</td>
          <td>
            <ul v-for="(hero, index) in props.item.heroes" :key="index">
              <li>
                <a :href="heroProfile(props.item.tagWeb, hero.id)" target="_blank">{{ hero.class }}</a>
              </li>
            </ul>
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import service from '@/services/index';

  export default {
    name: 'home',
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
          { text: 'Clan', value: 'clan' },
          { text: 'Heroes', value: '' },
          // { text: 'Heroes', value: '' },
        ],
      };
    },
    methods: {
      getUsersData() {
        service.getUsers()
          .then( ( querySnapshot ) => {
            querySnapshot.forEach( ( doc ) => {
              const arr = doc.id.split( '#' );
              const tagWeb = `${arr[ 0 ]}-${arr[ 1 ]}`;
              // doc.data() is never undefined for query doc snapshots
              this.users.push( { id: doc.id, ...doc.data(), tagWeb } );
            } );
          } )
          .catch( ( err ) => {
            console.debug( err );
          } );
      },
      heroProfile( tag, heroId ) {
        return `https://eu.diablo3.com/es/profile/${tag}/hero/${heroId}`;
      },
    },
  };
</script>

<style lang="stylus">

</style>
