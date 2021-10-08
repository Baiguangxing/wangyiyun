<template>
	<view style="padding:30upx">
		<view class="box">
			<Title
				class="row"
				title="用户_520154057843578435784357843"
				:list="data"
			></Title>
			<Title2 class="row" title="每日新鲜推荐" :list="data"></Title2>
			<Title3
				class="row"
				title="排行榜"
				:hy="hy"
				:gf="gf"
				:om="om"
				:lx="lx"
			></Title3>
			<Title2 class="row" title="必听的官方歌单" :list="data"></Title2>
			<Title4 class="row" title="这些歌单正合你意" :list="data2"></Title4>
			<view class="bottom">
				暂无更多歌单

				<view class="geci" @click="gcBtn">歌词测试按钮</view>
				<view class="str">
					<text v-for="(item, index) in arr" :key="index">{{ item }}</text>
				</view>
				<view @click="jsBtn">计时计算</view>
				<view>{{ date }}</view>
				<view style="height:200upx;">底部</view>
			</view>
		</view>
	</view>
</template>

<script>
import Title from '../list/title.vue';
import Title2 from '../list/title2.vue';
import Title3 from '../list/title3.vue';
import Title4 from '../list/title4.vue';
import { get } from '../../request.js';
export default {
	data() {
		return {
			arr: [],
			date: 0,
		};
	},
	props: {
		data: Array,
		data2: Array,
		hy: Array,
		gf: Array,
		om: Array,
		lx: Array,
	},
	components: {
		Title,
		Title2,
		Title3,
		Title4,
	},
	created() {},
	computed: {},
	methods: {
		formatTime(second) {
			var sec = second % 60;
			var min = Math.floor(second / 60);
			if (min.toString().length < 2) {
				min = '0' + min;
			}
			if (sec.toString().length < 2) {
				sec = '0' + sec;
			}
			return min + ':' + sec;
		},
		gcBtn() {
			// console.log("获取歌词的测试id:"+songlistIds[index].id) //459063003
			get('/lyric', { id: 459063003 }).then((res) => {
				//获取歌词 --> 成功
				console.log('歌词数据---------------');
				let data = res[1].data.lrc.lyric;
				console.log('转换---------------------');
				let arr = data.split(/\[[0-9][0-9]:[0-9][0-9].[0-9][0-9]\]/); //[00:17.02]
				arr.shift();
				console.log(arr, 'delete');
				this.arr = arr;

				//获取时间
				var a = data.match(/[0-9][0-9]:[0-9][0-9]/g);
				console.log(a);
			});
		},
		jsBtn() {
			//计时测试按钮
			console.log('开始计时');
			let i = 0;
			let _this = this;
			let js = setInterval(function() {
				i++;
				// console.log(i);
				_this.date = _this.formatTime(i);

				if(_this.date == "00:30"){
					clearInterval(js)
				}
				// console.log(typeof _this.date)
				// this.date = i++
			}, 1000);
		},
	},
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 100vh;
}

.row {
	margin-top: 70upx;
	&:first-child {
		margin-top: 0;
	}
}

.bottom {
	margin-top: 30upx;
	height: 1450upx;
	text-align: center;
	font-size: 30upx;
	color: #505050;
}

.geci {
	background-color: red;
	padding: 10upx;
	color: white;
}
</style>
