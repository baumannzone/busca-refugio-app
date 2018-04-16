<template>
  <section class="battle-tag-create">
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

      <div align="right">
        <v-btn @click="submit" color="info">Registrar Battle Tag</v-btn>
      </div>
    </v-form>
  </section>
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
        battleTag: 'SuperRambo#2613',
        battleTagRules: [
          v => !!v || 'Battle-tag is required',
        ],
      };
    },
    methods: {
      getUserByBattleTag( tag ) {
        service.getUserByBattleTag( tag )
          .then( ( res ) => {
            const promise = new Promise( ( resolve, reject ) => {
              if ( res.data.guildName === 'Busca Refugio' ) {
                resolve( res.data );
              }
              else {
                this.showSnackbar = true;
                this.color = 'info';
                this.snackbarMsg = `El usuario ${res.data.battleTag} pertenece al clan "${res.data.guildName}"`;
                reject( new Error( 'Este usuario no es del clan Busca Refugio' ) );
              }
            } );
            return promise;
          } )
          .then( ( res ) => {
            service.getBattleTag( tag )
              .then( ( result ) => {
                if ( !result.exists ) {
                  // Guardarlo si no existe en firebase DB
                  const data = {
                    battleTag: tag,
                    created: new Date(),
                  };
                  // Guardar usuario en BD
                  service.addBattleTag( tag, data )
                    .then( () => {
                      this.showSnackbar = true;
                      this.color = 'success';
                      this.snackbarMsg = `El usuario ${res.battleTag} ha sido guardado en la aplicación.`;
                      console.debug( `El usuario ${res.battleTag} se ha guardado correctamente` );
                    } )
                    .catch( ( error ) => {
                      console.debug( 'ERRORES2:', error );
                    } );
                }
                else {
                  // Este usuario ya existe en la BD
                  this.showSnackbar = true;
                  this.color = 'info';
                  this.snackbarMsg = `El usuario ${res.battleTag} ya está dado de alta en la aplicación.`;
                }
              } )
              .catch( ( err ) => {
                console.debug( err );
              } );
          } )
          .catch( ( err ) => {
            console.debug( err );
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
