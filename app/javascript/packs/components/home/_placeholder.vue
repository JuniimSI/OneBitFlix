<template>
  <div>
    <content-loader v-if="featured"    
      :speed="1"
      primaryColor="#cecece"
      style="opacity: 0.1"
      secondaryColor="#ecebeb"
    >
              <rect x="30" y="45" rx="4" ry="4" width="100" height="12"/>         
              <rect x="30" y="62" rx="4" ry="4" width="100" height="12" />         
              <rect x="30" y="79" rx="3" ry="3" width="35" height="8" /> 
              <rect x="70" y="79" rx="3" ry="3" width="35" height="8" /> 
              <rect x="30" y="94" rx="3" ry="3" width="120" height="6" /> 
              <rect x="30" y="105" rx="3" ry="3" width="100" height="6" />        

    </content-loader>
    <v-layout row wrap class="lista movie_list" v-if="movies.length > 0">
      <v-flex xs12>
        <content-loader
          :height="20"
          :width="300"
          :speed="1"
          primaryColor="#cecece"
          style="opacity: 0.1;"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="5" rx="4" ry="4" width="120" height="12.4" /> 
          
        </content-loader>
        <slick ref="slick" :options="slickOptions">
          
          
          <a v-for="movie in movies"
              :key="movie" 
              href="#"
              >
              <content-loader
                    :height="160"
                    :width="300"
                    :speed="1"
                    primaryColor="#cecece"
                    style="opacity: 0.2"
                    secondaryColor="#ecebeb"
                ></content-loader>
          </a>
        </slick>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Slick from 'vue-slick'
   import { ContentLoader } from "vue-content-loader"

  export default {
    props:  {
              movies: {
                type: Array,
                required: true,
              },
              featured: {
                type: Number,
                required: false,
              },
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
      ContentLoader
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