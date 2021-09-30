<template>
	<view style="padding:30upx">
		<view class="box">
			<Title class="row" title="用户xxx的专属歌单" :list="userList" :type="1"></Title>
			<Title class="row" title="每日新鲜推荐" :list="userList" :type="0"></Title>
			<Title class="row" title="排行榜" :list="userList" :type="0"></Title>
			<Title class="row" title="必听的官方歌单" :list="userList" :type="0"></Title>
			<Title class="row" title="这些歌单正合你意" :list="userList" :type="0"></Title>
			<view class="bottom">
				暂无更多歌单
			</view>
		</view>
	</view>
</template>

<script>
import Title from '../list/title.vue';
export default {
	data() {
		return {
			userList: [
				{
					src: require('../../static/image/r.jpg'),
					value: '精选 | 网络热歌分享',
				},
				{
					src: require('../../static/image/r.jpg'),
					value: '精选 | 网络热歌分享',
				},
				{
					src: require('../../static/image/r.jpg'),
					value: '精选 | 网络热歌分享',
				},
				{
					src: require('../../static/image/r.jpg'),
					value: '精选 | 网络热歌分享',
				},
				{
					src: require('../../static/image/r.jpg'),
					value: '精选 | 网络热歌分享',
				},
				{
					src: require('../../static/image/r.jpg'),
					value: '精选 | 网络热歌分享',
				},
			],
		};
	},
	components: {
		Title,
	},
	created() {},
	computed: {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 100vh;
}

.row{
    margin-top:70upx;
}

.bottom {
	width: 100%;
	height: 500upx;
    text-align: center;
    font-size:30upx;
    line-height: 150upx;
    color:#c9c9c9;
}
</style>
