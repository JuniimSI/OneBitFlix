import Http from './http';


export default {
  getFeatured () {  
    return Http.get('/dashboard', {
      params: {
        type: 'highlight'
      }
    })
  },
  setFavorite(id, type){
    return Http.post('/my_list', {
      favorite: {
        favoritable_id: id,
        favoritable_type: type.replace(/\b\w/g, l => l.toUpperCase())
      }
    });
  },
  getFavorites () {  
    return Http.get('/my_list');
  },
  getFeaturedUrl () {  
    return Http.get('/dashboard', {
      params: {
        type: 'highlight_url'
      }
    })
  },
  getCategories (){  
    return Http.get('/dashboard', {
      params: {
        type: 'category'
      }
    });
  },
  getKeepWatching (){  
    return Http.get('/dashboard', {
      params: {
        type: 'keep_watching'
      }
    });
  },
  getWatchable (id, type){
    return Http.get(`/${type.toLowerCase()}s/${id}`);
  },
  getSearch(query){
    return Http.get(`/search?value=${query}`)
  }
}