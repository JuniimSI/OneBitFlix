<template>
  <v-parallax fill-height :src="thumbUrl">
    <v-layout row wrap>
      <v-flex sm12 md4 offset-md1 class="content" fill-height>
        <v-layout row wrap>
          <v-flex sm12 md10>
            <p class="title">{{ movie.title }}</p>
          </v-flex>
          <v-flex sm6 md4>
            <v-btn color="black" large :to="'/watch/' + movie.id">Assistir</v-btn>
          </v-flex>
          <v-flex sm6 md4>
            <v-btn @click="setFavorite(movie.id, movie.type)" color="black" large>+ Minha Lista</v-btn>
          </v-flex>
          <v-flex sm12 md12>
            <p class="subtitle">{{ movie.description }} </p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-parallax>
</template>

<script>
  import { mapState } from 'vuex';
  import {mapActions} from 'vuex';
  export default {
    props: {
      movie: {
        type: Object,
        required: true,
      },
      thumbUrl: {
        required: true,
      }, 
    },
    methods: {
      setFavorite(id, type){
        this.Favorite({id: id, type: type});
      },
       ...mapActions({
            Favorite: 'Watchable/Favorite',
      })
    },
    data () {
     return {}
    },
    computed: mapState({
        favorite: state => state.Watchable.favorite,
    })
  }
</script>

<style scoped>
  .content {
    margin-top: 120px;
  }
  .title {
    font-size: 50px !important;
    font-family: 'Source Sans Pro';
    font-weight: 600;
    margin-bottom: 20px;
    text-shadow: 2px 2px 2px #000;
  }
  .subtitle{
    font-size: 20px !important;
    font-family: 'Source Sans Pro';
    font-weight: 600;
    margin-top: 20px;
    text-shadow: 2px 2px 2px #000;
  }
  .btn {
    color: white;
    background-color: #00000085 !important;
  }
</style>