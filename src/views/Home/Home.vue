<template>
  <div class="home">
    <v-app>
      <v-container>
        <p> Users: {{ users.length }} </p>

        <ul>
          <li v-for="user in users" :key="user.id">
            <p> {{ user.battleTag }} - {{ user.id }}
              <v-btn fab small color="white" @click="deleteUser(user.id)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </p>
          </li>
        </ul>

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
              label="Battle-tag"
              v-model="name"
              :rules="nameRules"
              required
          ></v-text-field>
          <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              required
          ></v-text-field>

          <v-btn @click="submit">Enviar</v-btn>
        </v-form>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  // @ is an alias to /src
  import db from '@/main';

  export default {
    name: 'home',
    data() {
      return {
        users: [],
        battleTags: [],
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Battle-tag is required',
          v => ( v && v.length <= 10 ) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test( v ) || 'E-mail must be valid',
        ],
      };
    },
    firestore() {
      return {
        users: db.collection( 'users' ),
        battleTags: db.collection( 'battle-tags' ),
      };
    },
    methods: {
      addUser() {
        const userData = {
          battleTag: 'SuperRambo#2613',
          paragonLevel: 453,
          paragonLevelHardcore: 0,
          paragonLevelSeason: 571,
          paragonLevelSeasonHardcore: 0,
          guildName: 'Busca Refugio',
          heroes: [
            {
              id: 106588658,
              name: 'JavatoJones',
              class: 'nigromante',
              classSlug: 'necromancer',
              gender: 0,
              level: 70,
              kills: {
                elites: 2066,
              },
              paragonLevel: 571,
              hardcore: false,
              seasonal: true,
              dead: false,
              'last-updated': 1523385205,
            },
          ],
          lastHeroPlayed: 106588658,
          lastUpdated: 1523385205,
          kills: {
            monsters: 200092,
            elites: 16598,
            hardcoreMonsters: 452,
          },
          highestHardcoreLevel: 11,
          timePlayed: {
            'demon-hunter': 0.448,
            barbarian: 0.058,
            'witch-doctor': 0.333,
            necromancer: 0.037,
            wizard: 0.108,
            monk: 1,
            crusader: 0.197,
          },
          progression: {
            act1: true,
            act3: true,
            act2: true,
            act5: true,
            act4: true,
          },
          seasonalProfiles: {
            season13: {
              seasonId: 13,
              paragonLevel: 571,
              paragonLevelHardcore: 0,
              kills: {
                monsters: 19990,
                elites: 1786,
                hardcoreMonsters: 0,
              },
              timePlayed: {
                'demon-hunter': 0,
                barbarian: 0,
                'witch-doctor': 0,
                necromancer: 0.136,
                wizard: 0,
                monk: 0,
                crusader: 0,
              },
              highestHardcoreLevel: 0,
            },
            season0: {
              seasonId: 0,
              paragonLevel: 453,
              paragonLevelHardcore: 0,
              kills: {
                monsters: 200092,
                elites: 16598,
                hardcoreMonsters: 452,
              },
              timePlayed: {
                'demon-hunter': 0.448,
                barbarian: 0.058,
                'witch-doctor': 0.333,
                necromancer: 0.037,
                wizard: 0.108,
                monk: 1,
                crusader: 0.197,
              },
              highestHardcoreLevel: 11,
            },
          },
          blacksmithSeason: {
            slug: 'blacksmith',
            level: 12,
          },
          jewelerSeason: {
            slug: 'jeweler',
            level: 12,
          },
          mysticSeason: {
            slug: 'mystic',
            level: 12,
          },
          blacksmithHardcore: {
            slug: 'blacksmith',
            level: 0,
          },
          jewelerHardcore: {
            slug: 'jeweler',
            level: 0,
          },
          mysticHardcore: {
            slug: 'mystic',
            level: 0,
          },
          blacksmithSeasonHardcore: {
            slug: 'blacksmith',
            level: 0,
          },
          jewelerSeasonHardcore: {
            slug: 'jeweler',
            level: 0,
          },
          mysticSeasonHardcore: {
            slug: 'mystic',
            level: 0,
          },
          blacksmith: {
            slug: 'blacksmith',
            level: 12,
          },
          jeweler: {
            slug: 'jeweler',
            level: 12,
          },
          mystic: {
            slug: 'mystic',
            level: 12,
          },
        };
        db.collection( 'users' ).add( userData );
      },
      submit() {
        if ( this.$refs.form.validate() ) {
          this.addUser();
        }
      },
      deleteUser( id ) {
        db.collection( 'users' ).doc( id ).delete();
      },
    },
  };
</script>
