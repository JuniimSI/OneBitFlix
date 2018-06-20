import Api from '../../api';

const Watchable = {
    namespaced: true,
    state: {
      featured: null,
      featuredUrl: null,
      keepWatching: null,
      favorites: null,
      categories: [],
      search: null,
      favorite: null,
      watchable: null
    },
    mutations: {
      setSearch(state, movie){
        if(movie.data){
          movie.data.forEach(element => {
            element.type='movie'
          });  
          state.search = movie.data;
        }
      },
      setFavorite(state, watchable){
        state.favorite = watchable.data;
      },
      setFavorites(state, watchable){
        state.favorites = watchable.data;
      },
      setFeatured(state, watchable) {
        state.featured = watchable.data.attributes;
      },
      setFeaturedUrl(state, watchable) {
        state.featuredUrl = watchable.data.attributes.featured_thumbnail_key;
      },
      setKeepWatching(state, watchables){
        state.keepWatching = watchables.data;
      },
      setCategories(state, categories){
        state.categories = categories.data;
      },
      setWatchable(state, watchable) {
        state.watchable = watchable.data;
      }
    },
    actions: {
      getFeatured(context) {
        Api.Watchable.getFeatured()
          .then(response => response.data)
          .then(watchable => {
            context.commit('setFeatured', watchable)
          }).catch(function (error) {
            console.log(error);
          });
      },
      Favorite(context, {id, type}) {
        Api.Watchable.setFavorite(id, type)
          .then(response => response.data)
          .then(watchable => {
            context.commit('setFavorite', watchable)
          }).catch(function (error) {
            console.log(error);
          });
      },
      getFavorites(context) {
        Api.Watchable.getFavorites()
          .then(response => response.data)
          .then(watchable => {
            context.commit('setFavorites', watchable)
          }).catch(function (error) {
            console.log(error);
          });
      },
      getFeaturedUrl(context) {
        Api.Watchable.getFeaturedUrl()
          .then(response => response.data)
          .then(watchable => {
            context.commit('setFeaturedUrl', watchable)
          }).catch(function (error) {
            console.log(error);
          });
      },
      getKeepWatching(context) {
        Api.Watchable.getKeepWatching()
          .then(response => response.data)
          .then(watchables => {
            context.commit('setKeepWatching', watchables)
          }).catch(function(error){
            console.log(error);
          });
        },
        getCategories(context) {
          Api.Watchable.getCategories()
            .then(response => response.data)
            .then(categories => {
              context.commit('setCategories', categories)
            }).catch(function(error){
              console.log(error);
            });
          },
          getSearch(context, {query}) {
            Api.Watchable.getSearch(query)
              .then(response => response.data)
              .then(movie => {
                context.commit('setSearch', movie)
              }).catch(function(error){
                console.log(error);
              });
            },
          getWatchable(context, {id, type}) {
            Api.Watchable.getWatchable(id, type)
              .then(response => response.data)
              .then(watchable => {
                context.commit('setWatchable', watchable)
              }).catch(function (error) {
                console.log(error);
              });
          }
      }
  };
  
  export default Watchable;