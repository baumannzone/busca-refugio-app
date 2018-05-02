<template>
  <div class="page">
    <h1>Main page</h1>
    <div class="main-table">
      <v-data-table
          :headers="headers"
          :items="users"
          hide-actions
          class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <b>{{ props.item.id }}</b>
          </td>
          <!--<td>{{ props.item.guildName }}</td>-->
          <td>
            <ul class="hero-list">
              <li v-for="(hero, index) in props.item.heroes" :key="index">
                <a :href="heroProfile(props.item.tagWeb, hero.id)" target="_blank">
                  <span class="hero-portrait" :class="setHeroClass(hero)">
                    <span v-if="hero.seasonal" :class="{'small-seasonal-leaf': hero.seasonal}"></span>
                  </span>
                  <small>{{ hero.class }}</small>
                </a>
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
          // { text: 'Clan', value: 'clan' },
          { text: 'Heroes', value: '' },
          // { text: 'Heroes', value: '' },
        ],
      };
    },
    methods: {
      getUsersData() {
        service.getUsers()
          .then( ( querySnapshot ) => {
            console.debug( querySnapshot[ 0 ] );
            querySnapshot.forEach( ( doc ) => {
              // Convertir de User#1234 a User-1234
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
      setHeroClass( hero ) {
        const slug = hero.classSlug;
        const gender = this.setHeroGender( hero.gender );
        return `${slug}-${gender}`;
      },
      setHeroGender( gender ) {
        return gender === 0 ? 'male' : 'female';
      },
    },
  };
</script>

<style lang="stylus">
  .hero-list
    list-style none
    li
      display inline-block
      width 150px
      height 100px
</style>
