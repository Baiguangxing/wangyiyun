import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test:"测试数据",
    playlistDat:{},
    trackIds:[],
    songlistIds:[],
    index:0
  },
  mutations: {
    
  }
})

export default store