import Vue from 'vue'
import App from './app.vue'
import Vuetify from 'vuetify'
import store from './store';

import 'vuetify/dist/vuetify.min.css'
import 'slick-carousel/slick/slick.css'
import '../.././css/slick-carousel/slick/slick-theme.css'
import 'vue-dplayer/dist/vue-dplayer.css'
import '../.././css/styles.css'
import router from './routes.js' 

Vue.use(Vuetify)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})

