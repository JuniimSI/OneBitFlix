<template>
  <v-layout row wrap>
    <v-flex md4 mb-3 mt-3 offset-md1 xs10 offset-xs1>
      <v-layout row wrap>
        <v-flex md12>
          <h4 class="subtitle white--text" v-if="watchable.type == 'serie'">{{watchable.relationships.episodes.data.length}} Episódios</h4>
        </v-flex>
      </v-layout>
      <v-layout row wrap mt-3>
        <v-flex md3 sm3>
          <v-chip label dark>
            <v-icon left>label</v-icon>{{watchable.attributes.category}}
          </v-chip>
        </v-flex>
        <v-flex class="favoritos" md6 pt-3 pl-3>
          <v-icon v-for="r in watchable.attributes.reviews_count" :key='r' color="red">favorite</v-icon>
          <v-icon  v-for="r in (5 - watchable.attributes.reviews_count)" :key='watchable.attributes.reviews_count + r' color="white">favorite</v-icon>
        </v-flex>
      </v-layout>
      <v-layout row wrap mt-4>
        <v-flex sm3 md3>
          <v-btn color="red"
                 text-color="white"
                 large
                 :to="'/watch/'+ watchable.attributes.last_watched_episode"
                 class="white--text"
                 v-if="watchable.attributes.last_watched_episode">Assistir
          </v-btn>
           <v-btn color="red"
                 text-color="white"
                 large
                 class="white--text"
                 :to="'/watch/'+ watchable.relationships.episodes.data[0].id"
                 v-else-if="watchable.type == 'serie'">Assistir
          </v-btn>
          
          <v-btn color="red"
                 text-color="white"
                 large
                 :to="'/watch/'+ watchable.id"
                 class="white--text"
                 v-else>Assistir
          </v-btn>
         
        </v-flex>
        <v-flex sm3 md4>
          <v-btn v-if="watchable && watchable.type=='movie'" color="black" class="watch-btn white--text" @click="setFavorite(watchable.id, watchable.type)" large>+ Minha Lista</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap mt-2>
        <v-flex md12>
          <p class="white--text text">{{watchable.attributes.description}}</p>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex fill-height md5 offset-md1 hidden-sm-and-down>
      <v-layout row wrap mt-12 center xs-10>
        <img :src="watchable.attributes.thumbnail_cover_url" class="responsive-img"/>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex';
  import {mapActions} from 'vuex';
  export default {
    props: {
      watchable: {
        type: Object,
        required: true
      }
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
      return { 
        
      }
    },
    computed: mapState({
        favorite: state => state.Watchable.favorite,
      })
  }
</script>

<style scoped>
  .subtitle{
    font-size: 22px;
  }
  .text{
    font-size: 16px;
  }
  .favoritos{
      padding-left: 20px;
  }
  .btn{
    color: white;
    font-weight: 600;
    font-family: 'Source Sans Pro';
    margin-left: 0px;
  }
  .watch-btn {
    border-color: white !important;
    border-style: solid;
  }
  .chip{
    margin-left: 0px;
  }
</style>