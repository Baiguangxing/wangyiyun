import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const innerAudioContext = uni.createInnerAudioContext(); //创建播放器

const store = new Vuex.Store({
	state: {
		test: '测试数据',
		playlistDat: {},
		trackIds: [],
		songlistIds: [],
		index: 0,
		sjNum:1,

		creatA: innerAudioContext,
	},
	mutations: {},
});

export default store;
