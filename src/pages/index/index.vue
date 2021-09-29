<template>
	<view>
		这是首页页面
		<button @click="gsBtn">歌手分类接口</button>

		<image :src="imgSrc"></image>
	</view>
</template>

<script>
import { get } from '../../request.js';
export default {
	data() {
		return {
			imgSrc:"a"
		};
	},

	methods: {
		gsBtn() {
			let _this = this;
			get('/artist/list', { type: 1, area: 96, initial: 'b' })
			.then((res) => {
				console.log(res);
				this.imgSrc = res[1].data.artists[0].picUrl
				// console.log(_this.data.imgSrc)
			});
		},
	},

	//生命周期
	onLoad() {},
};
</script>

<style></style>
