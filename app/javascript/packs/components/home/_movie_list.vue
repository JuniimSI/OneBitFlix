<template>
  <div>
    <v-layout row wrap class="lista movie_list" v-if="movies.length > 0">
      <v-flex xs12>
        <p class='name'>{{ name }}</p>
        <slick ref="slick" :options="slickOptions">
          <a v-for="movie in movies"
              :key="movie.attributes.id" 
              href="#"
              @click="openDetails($event, movie.attributes.id, movie.type)"
              ><img :src="movie.attributes.thumbnail_url">
          </a>
        </slick>
      </v-flex>
    </v-layout>
    <transition name="slide-fade">
      <MovieMenu v-if="menuOpen && currentMovieId == movieId && show" :movieId="movieId"
                :id="movieId" 
                :type="movieType" 
                :closeDetails="closeDetails"/>
    </transition>
  </div>
</template>

<script>
  import MovieMenu from './_movie_menu.vue';
  import Slick from 'vue-slick';
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    props:  {
              name: {
                type: String,
                required: true,
              },
              movies: {
                type: Array,
                required: true,
              }
            },
    data () {
      return {
        show: false,
        menuOpen: false,
        movieId: null,
        movieType: null,
        slickOptions: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: true,
          dots: true,
          infinite: false,
          responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              }
            },
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
      Slick,
      MovieMenu
    },
    methods: {
      openDetails(e, id, type) {
        e.preventDefault();
        
        if(this.menuOpen == true && this.movieId == id){
          this.closeDetails();
        }else {
          this.changeId(id);
          this.movieId = parseInt(id);
          this.movieType = type;
          this.menuOpen = true;
          this.show = true;
        }
      },
      closeDetails(){
        this.menuOpen = false;
        this.show = false;
      },
      ...mapActions({
        changeId: 'MovieMenu/changeId',
      })
    },
    computed: mapState({
      currentMovieId: state => state.MovieMenu.currentMovieId,
    })
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
</style>