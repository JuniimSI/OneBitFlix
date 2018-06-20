<template>
<v-container mt-1 >
    <v-layout row v-if="!loaded">
      <v-flex xs12 md10 offset-md1 center>

        <v-layout row>
          <v-flex xs12 md10>
            <div style="z-index: 30; top: 38%;" class="circle"></div>  
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row v-if="loaded">
      <v-flex xs12 md10 offset-md1 center>

        <v-layout row>
          <v-flex xs12 md10>
            <h1 class="main_title" v-if="serie">{{ serie.attributes.title }}</h1>
            <h1 class="main_title" v-else>{{ movie.attributes.title }}</h1>
          </v-flex>
        </v-layout>

        <v-layout row pt-2 pb-2>
          
          <v-flex xs12 md12>
            <v-layout v-if="showProgress" class="content" wrap row>
              <div style="z-index: 30; top: 38%;" class="circle"></div>  
            </v-layout>
            <d-player v-if="serie" :options="options"
                  ref="player"
                  @loadstart="setupPlayer"
                  @loadeddata="indiceOf"
                  @emptied="showProgressLoad"
                  @ended="finishPlayer"
                  @canplay="hideProgressLoad"
                  @timeupdate="progressUpdate"
            > 
            </d-player>
            <d-player v-else :options="options"
                  ref="player"
                  @loadstart="setupPlayer"
                  @canplay="hideProgressLoad"
                  @emptied="showProgressLoad"
                  @ended="finishPlayer"
                  @timeupdate="progressUpdate"
            > 
            </d-player>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 md6 mt-1>
            <h1 class="secundary_title" v-if="serie">{{ movie.attributes.title }}</h1>
          </v-flex>

          <v-flex xs8 md3 class="text-lg-right" v-if="serie">
            <v-menu open-on-hover top offset-y>
              <v-btn slot="activator" dark large>
                <v-icon left>video_library</v-icon>Episodios
              </v-btn>

              <v-list dark>
                <v-list-tile v-for="(episode, index) in serie.attributes.episodes" :key="index" :to="`/watch/${episode.id}`">
                  <v-list-tile-title>{{ episode.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>

          <v-flex xs8 md3 class="text-lg-right" v-if="serie">
            <v-btn v-if="showProximo" :to="'/watch/'+serie.relationships.episodes.data[novoIndice].id" dark large>
              <v-icon left>skip_next</v-icon>Proximo
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  import { ContentLoader } from "vue-content-loader"
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        options: {
          screenshot: true,
          video: { url: '', pic: '' }
        },
        showProximo: true,
        showProgress: true,
        lastUpdateTime: 0,
        lastUpdateActive: false,
        loaded: false,
        novoIndice: 0
      }
    },
    components: {
      'd-player': VueDPlayer,
      ContentLoader
    },
    methods: {
      
      finishPlayer() {
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
        this.updatePlayer({
          id: this.movie.id,
          elapsed_time: this.$refs.player.dp.video.currentTime,
          end_time: datetime
        })
      },
      ...mapActions({
        getPlayer: 'Player/show',
        updatePlayer: 'Player/update'
      }),
       showProgressLoad(){
         this.showProgress = !this.showProgress;
       },
       hideProgressLoad(){
         this.showProgress = false;
       },
       indiceOf: function(){
          this.showProgress = false;
          let index = 0;
          if(this.serie.relationships.episodes.data[this.serie.relationships.episodes.data.length - 1].id == this.player.id){
            this.showProximo = false;
            return;
          }else{
            this.showProximo = true;
          }
            this.serie.relationships.episodes.data.forEach(element => {
                this.showProximo = true;
              if(element.id == this.player.id){
                this.novoIndice = (index+1);
              }
              index += 1;
            });
   
      },
      setupPlayer() {
        if(this.player && this.player.elapsed_time != null){
          this.$refs.player.dp.seek(this.player.elapsed_time);
          //this.indiceOf();
        }
      },
      progressUpdate() {
        if(this.$refs.player.dp.video.currentTime - this.lastUpdateTime > 5){
          this.lastUpdateTime = this.$refs.player.dp.video.currentTime;
          if(this.lastUpdateActive == true){
            this.updatePlayer({
              id: this.movie.id,
              elapsed_time: this.$refs.player.dp.video.currentTime,
              end_time: null
            })
          }else{
            this.lastUpdateActive = true;
          }
          
        }
      }
    },
    mounted() {
      this.getPlayer(this.$route.params.id)
    },
    computed: {
     
      ...mapState({
        player: state => state.Player.player,
        movie: state => state.Player.movie,
        serie: state => state.Player.serie,  
      }),

    },
    watch: {
      movie:function () {
        this.options.video.url = this.movie.attributes.video_url;
        this.options.video.pic = this.movie.attributes.thumbnail_cover_url;
        this.loaded = true;
      }
    },
  }
</script>

<style scoped>
  .main_title{
    color: white;
    font-size: 24px !important;
    font-family: 'Source Sans Pro';
    font-weight: 600;
  }
  .secundary_title{
    color: white;
    font-size: 20px !important;
    font-family: 'Source Sans Pro';
    font-weight: 600;
  }
  .btn {
    margin-right: 0px;
  }
</style>