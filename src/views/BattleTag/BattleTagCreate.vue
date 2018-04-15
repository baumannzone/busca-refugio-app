<template>
  <div class="pag-1">
    <v-snackbar :color="color" :timeout="6000" top right v-model="showSnackbar">
      {{ snackbarMsg }}
      <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-form v-model="isFormValid" ref="form" lazy-validation>
      <v-text-field
          label="Battle-tag"
          v-model="battleTag"
          :rules="battleTagRules"
          placeholder="SuperRambo#2613"
          hint="Distingue entre mayúsculas y minúsculas"
          persistent-hint
          required>
      </v-text-field>

      <v-btn @click="submit" color="info">Comprobar</v-btn>
    </v-form>
  </div>
</template>

<script>
  import service from '@/services/index';

  export default {
    name: 'home',
    created() {
    },
    data() {
      return {
        showSnackbar: false,
        color: 'success',
        snackbarMsg: '',
        isFormValid: true,
        battleTag: '',
        battleTagRules: [
          v => !!v || 'Battle-tag is required',
        ],
      };
    },
    methods: {
      getUserByBattleTag( tag ) {
        service.getUserByBattleTag( tag )
          .then( ( res ) => {
            if ( res.data.guildName === 'Busca Refugio' ) {
              this.showSnackbar = true;
              this.color = 'success';
              this.snackbarMsg = `El usuario ${res.data.battleTag} pertenece al clan "${res.data.guildName}"`;
            }
            else {
              this.showSnackbar = true;
              this.color = 'info';
              this.snackbarMsg = `El usuario ${res.data.battleTag} pertenece al clan "${res.data.guildName}"`;
            }
          } )
          .catch( ( err ) => {
            this.showSnackbar = true;
            this.color = 'error';
            this.snackbarMsg = `El usuario ${tag} no existe`;
          } );
      },
      submit() {
        if ( this.$refs.form.validate() ) {
          const arr = this.battleTag.split( '#' );
          let tag = this.battleTag;
          if ( arr.length === 2 ) {
            tag = `${arr[ 0 ]}-${arr[ 1 ]}`;
            this.getUserByBattleTag( tag );
          }
          else {
            console.debug( 'formato incorrecto' );
          }
        }
      },
    },
  };
</script>

<style lang="stylus">

</style>
