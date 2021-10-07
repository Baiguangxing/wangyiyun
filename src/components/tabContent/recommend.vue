<template>
	<view style="padding:30upx">
		<view class="box">
			<Title class="row" title="用户_520154057843578435784357843" :list="data"></Title>
			<Title2 class="row" title="每日新鲜推荐" :list="data"></Title2>
			<Title3 class="row" title="排行榜" :hy="hy" :gf="gf" :om="om" :lx="lx"></Title3>
			<Title2 class="row" title="必听的官方歌单" :list="data"></Title2>
			<Title4 class="row" title="这些歌单正合你意" :list="data2"></Title4>
			<view class="bottom">
				暂无更多歌单
			</view>
		</view>
	</view>
</template>

<script>
import Title from '../list/title.vue';
import Title2 from '../list/title2.vue';
import Title3 from '../list/title3.vue';
import Title4 from '../list/title4.vue';
export default {
	data() {
		return {
			userList: [
				{
					picUrl: require('../../static/image/r.jpg'),
					name: '精选 | 网络热歌分享',
				},
				{
					picUrl: require('../../static/image/r.jpg'),
					name: '精选 | 网络热歌分享',
				},
				{
					picUrl: require('../../static/image/r.jpg'),
					name: '精选 | 网络热歌分享',
				},
				{
					picUrl: require('../../static/image/r.jpg'),
					name: '精选 | 网络热歌分享',
				},
				{
					picUrl: require('../../static/image/r.jpg'),
					name: '精选 | 网络热歌分享',
				},
				{
					picUrl: require('../../static/image/r.jpg'),
					name: '精选 | 网络热歌分享',
				},
			],
		};
	},
	props:{
		data:Array,
		data2:Array,
		hy:Array,
		gf:Array,
		om:Array,
		lx:Array
	},
	components: {
		Title,
		Title2,
		Title3,
		Title4
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
	&:first-child{
		margin-top:0;
	}
}

.bottom {
	margin-top:30upx;
	height: 450upx;
    text-align: center;
    font-size:30upx;
    color:#505050;
}
</style>
