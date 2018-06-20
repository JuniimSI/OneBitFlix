<template>
  <div>
        <Featured :movie="featuredMovie" :thumbUrl="'http://localhost:3000/thumbnails/'+featuredUrl" v-if="featuredMovie"/>

        <PlaceHolder :movies='[]' :featured='1' v-if="!featuredMovie"/>
        <PlaceHolder :movies='[1, 2, 3, 4]' v-if="!keepWatching"/>
        <PlaceHolder :movies='[1, 2, 3, 4]' v-if="!keepWatching"/>
        <PlaceHolder :movies='[1, 2, 3, 4]' v-if="!keepWatching"/>
        <PlaceHolder :movies='[1, 2, 3, 4]' v-if="!keepWatching"/>
        <PlaceHolder :movies='[1, 2, 3, 4]' v-if="!keepWatching"/>
        <PlaceHolder :movies='[1, 2, 3, 4]' v-if="!keepWatching"/>

        <MovieList v-if="search != '' && search" name='Search: ' :movies='search' />
        <MovieList name='Continue assistindo' :movies='keepWatching' v-if="keepWatching"/>
        <MovieList name='Favorites' :movies='favorites' v-if="favorites"/>
        <MovieList v-for='(category, index) in categories'
                    :key='index'
                    :name='category.attributes.name'
                    :movies='[...category.attributes.movies.data, ...category.attributes.series.data]'/>
  </div>
   </template>
  <script>
    import Featured from './_featured.vue'
    import MovieList from './_movie_list.vue'
    import PlaceHolder from './_placeholder.vue'
    import { mapState } from 'vuex';
    import {mapActions} from 'vuex';
   import { ContentLoader } from "vue-content-loader"

    export default {
      data () {
        return {        
        }
      },
      methods: {
       
      },
      components: {
        'Featured': Featured,
        'MovieList': MovieList,
        'ContentLoader': ContentLoader,
        'PlaceHolder': PlaceHolder
      },
      mounted() {
        this.$store.dispatch('Watchable/getFeatured');
        this.$store.dispatch('Watchable/getKeepWatching');
        this.$store.dispatch('Watchable/getCategories');
        this.$store.dispatch('Watchable/getFeaturedUrl');
        this.$store.dispatch('Watchable/getFavorites');
        
      },
      computed: mapState({
        favorites: state => state.Watchable.favorites,
        featuredMovie: state => state.Watchable.featured,
        featuredUrl: state => state.Watchable.featuredUrl,
        keepWatching: state => state.Watchable.keepWatching,
        categories: state => state.Watchable.categories,
        search: state => state.Watchable.search,
      })
    }
   </script>

   <style scoped>
   </style>