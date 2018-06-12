<template >
  <v-toolbar v-bind:style="{position: position, top: top+'px'}" 
    v-bind:class="{'theme--dark': theme, transparent: transparent}"
    id="header" class="header-fixed elevation-0" >
    <v-layout row wrap>
      <v-flex xs10 sm4>
        <router-link to="/">
          <img :src='logo' class="logo"/>
        </router-link>
      </v-flex>
    </v-layout>
    <v-toolbar-items class="menu_itens elevation-4" v-bind:class="{'theme--dark': theme_itens}">
        <v-text-field @blur="desafocus" @click="focus" 
          flat
          prepend-icon="search"
          label="Search"
          class="hidden-sm-and-down"
          color="red"
          pr-3
      ></v-text-field>

      <v-menu bottom flat >
        <v-btn slot="activator" flat>
          <v-icon large>account_box</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>
              <a href="/users/edit">Details</a>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              <a href="/users/sign_out">Logout</a>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import Logo from '../../assets/logo.png';
  export default {
    header: '#header',
    data () { 
      return {
        position: 'fixed',
        theme: false,
        theme_itens: true,
        transparent: true,
        top: 0,
        logo: Logo
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll () {
        if(window.pageYOffset > 0){
          this.theme = true; 
          this.transparent = false;
          this.theme_itens =  false;
        } else if(window.pageYOffset <= 0){
          this.theme_itens = true;
          this.theme = false;
          this.transparent = true;
        }
      },
      focus: function () {
         this.theme = true; 
         this.transparent = false;
      },
      desafocus: function (){
        this.handleScroll();
      }
    }
  }

</script>

<style scoped>

.transparent{
  background: transparent;
  transition: background-color  1.5s linear;
}
.header-fixed{
    position: fixed;
    display: block;
    width: 100%;
    z-index: 300;
    transition: background-color  1.5s linear;
  }
  .logo {
    width: 120px !important;
    margin-top: 10px;
  }
.theme--dark{
  transition: background-color  1.5s linear;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
.menu_itens{
  padding-left: 20px;
}
</style>