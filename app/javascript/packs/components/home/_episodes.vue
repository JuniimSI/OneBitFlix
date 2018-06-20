<template>

    <v-layout row wrap class="flex movie-list" v-if="watchable.relationships.episodes.data.length > 0">
      <v-flex xs12>
        <slick ref="slick" :options="slickOptions">
          <a v-for="episode in watchable.attributes.episodes"
              :key="episode.id">
              <div class="show-image">
                <img :src="episode.thumbnail_url">
                <v-btn flat icon color="lighten-2" text-color="white" large :to="'/watch/'+ episode.id" class="play white--text">
                  <v-icon style="font-size: 80px;" color="red" dark>play_circle_outline</v-icon>
                </v-btn>
            </div>
          </a>
        </slick>
      </v-flex>
    </v-layout>

</template>

<script>
  import Slick from 'vue-slick';
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:  {
              watchable: {
                type: Object,
                required: true
              }
            },
    data () {
      return {
        slickOptions: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: true,
          dots: true,
          infinite: false,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        }
      }
    },
    components: {
      Slick
    },
    methods: {
      log(){
          console.log("CLICKED");
      }
    }
}
</script>


<style scoped>

  .lista a img:hover{
    background: black;
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    background-color: black;
    border: white 3px;
  }

.movie_list{
    margin-left: 4%;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-right: 4%;
  }
  .item{
    border: 2px white;
  }
  .arrows{
    color: white;
  }
  .name {
    font-size: 24px !important;
    font-family: 'Source Sans Pro';
    font-weight: 600;
    color: white;
  }
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.play{
  background-color: transparent;
  font-size: 80px;
}
div.show-image {
    position: relative;
}
div.show-image:hover img{
   -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    z-index:20px;
}
div.show-image:hover .play {
    display: block;
}
div.show-image .play {
    position:absolute;
    display:none;
}
div.show-image .play {
    top:36%;
    left:40%;
}

</style>