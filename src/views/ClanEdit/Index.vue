<template>
  <section class="clan-edit">
    <h1>Gestión de rangos del Clan</h1>
    <v-data-table :headers="headers" :items="users" hide-actions class="elevation-1">
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td><b>{{ props.item.id }}</b></td>
        <td>
          <itemClanType :data="props.item.clanData.clan" type="clan"/>
        </td>
        <td class="">
          <itemClanType :data="props.item.clanData.webApp" type="webApp"/>
        </td>
        <td>
          <span>{{props.item.clanData.updated}}</span>
        </td>
        <td class="text-xs-right">
          <button class="openModalBtn" @click="openModal(props.item)">
            <i class="fas fa-user-cog fa-lg"></i>
          </button>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="modalEditUserClan" max-width="600px" v-if="selectedUser">
      <v-card>
        <v-card-title>
          <h3>Editando:
            <span class="userId">{{ selectedUser.id }}</span>
          </h3>
        </v-card-title>
        <v-card-text>
          <v-form v-model="formEditUserClan">
            <v-layout row wrap>
              <v-flex xs6>
                <h3>Rango del Clan</h3>
                <v-radio-group v-model="form.clan.range">
                  <v-radio label="User" :value="0"></v-radio>
                  <v-radio label="Oficial" :value="1"></v-radio>
                  <v-radio label="Líder" :value="2"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6>
                <h3>Administrador web</h3>
                <v-radio-group v-model="form.webApp.range">
                  <v-radio label="User" :value="0"></v-radio>
                  <v-radio label="Admin" :value="1"></v-radio>
                  <v-radio label="Root" :value="2"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
            <small v-if="userUpdated">Última actualización: {{ userUpdated }}</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="modalEditUserClan=false">Cancelar</v-btn>
          <v-btn color="primary" @click="updateUserClanData" :loading="loading">Guardar cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import service from '@/services/index';
  import { mapGetters } from 'vuex';
  import ItemClanType from './ItemClanType.vue';

  export default {
    components: { ItemClanType },
    data() {
      return {
        form: {},
        headers: [
          { text: 'Battle-Tag', align: 'left', value: 'id' },
          { text: 'Clan', value: 'clanData.clan.range' },
          { text: 'WebApp', value: 'clanData.webApp.range' },
          { text: 'Última actualización', sortable: true, value: 'clanData.updated' },
          { text: 'Editar', align: 'right', sortable: false },
        ],
        users: [],
        selectedUser: null,
        modalEditUserClan: false,
        formEditUserClan: false,
        loading: false,
      };
    },
    watch: {
      // onModal close, clear data
      modalEditUserClan() {
        if ( this.modalEditUserClan === false ) {
          this.selectedUser = null;
          this.setFormDefaultValues();
        }
      },
    },
    created() {
      this.fetchData();
      this.setFormDefaultValues();
    },
    methods: {
      fetchData() {
        service.getUsers()
          .then( ( querySnapshot ) => {
            querySnapshot.forEach( ( doc ) => {
              // Convertir de User#1234 a User-1234
              const arr = doc.id.split( '#' );
              const tagWeb = `${arr[ 0 ]}-${arr[ 1 ]}`;
              this.users.push( { id: doc.id, ...doc.data(), tagWeb } );
            } );
          } )
          .catch( ( err ) => {
            console.debug( err );
          } );
      },
      updateClanRange( id ) {
        const data = {
          webApp: {
            isAdmin: true,
            range: 1, // 0, 1
          },
          clan: {
            isAdmin: true,
            range: 2, // 0, 1, 2
          },
        };
        service.setClanRange( data, id );
      },
      openModal( user ) {
        try {
          if ( user.clanData ) {
            this.form = {
              clan: {
                isAdmin: user.clanData.clan.isAdmin || false,
                range: user.clanData.clan.range || 0,
              },
              webApp: {
                isAdmin: user.clanData.webApp.isAdmin || false,
                range: user.clanData.webApp.range || 0,
              },
            };
          }
        }
        catch ( e ) {
          this.form = {
            clan: {
              isAdmin: false,
              range: 0,
            },
            webApp: {
              isAdmin: false,
              range: 0,
            },
          };
        }
        this.selectedUser = user;
        this.modalEditUserClan = true;
      },
      setFormDefaultValues() {
        this.form = {
          clan: {
            isAdmin: false,
            range: 0,
          },
          webApp: {
            isAdmin: false,
            range: 0,
          },
        };
      },
      updateUserClanData() {
        this.loading = true;
        const tag = this.selectedUser.id;
        const data = { ...this.form };
        data.updated = new Date();
        service.editClanRange( tag, data )
          .then( () => {
            const index = this.users.findIndex( item => item.id === tag );
            this.users[ index ].clanData = data;
            this.loading = false;
            this.modalEditUserClan = false;
          } )
          .catch( ( err ) => {
            console.debug( 'KO', err );
            this.loading = false;
          } );
      },
    },
    computed: {
      userUpdated() {
        try {
          return this.$moment( this.selectedUser.clanData.updated ).format( 'DD/MM/YY' );
        }
        catch ( e ) {
          return null;
        }
      },
      ...mapGetters( {
        isLogged: 'isUserLogged',
      } ),
    },
  };
</script>

<style lang="stylus" scoped>
  .openModalBtn
    color teal

  .mt-18
    margin-top 18px

  .userId
    color: lightseagreen
    font-family monospace
    font-size 25px


</style>
