<template>
	<view>
		<!-- 头部导航栏 -->
		<!-- <view class="toptab">
			<uni-row class="demo-uni-row">
				<uni-col :span=3>
					<uni-icons type="arrowthinleft" size="30"></uni-icons>
				</uni-col>
				<uni-col :span=12>
					<view class="toptabTitle">歌单广场</view>
				</uni-col>
			</uni-row>
		</view> -->

		<!-- 导航切换样式 -->
		<scroll-view scroll-x>
			<topTab :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></topTab>
		</scroll-view>

		<!-- 切换导航相应的内容 -->
		<view class="uni-tab-bar">
			<swiper
				class="swiper-box"
				:style="{ height: swiperheight + 'px' }"
				:current="tabIndex"
				@change="tabChange"
			>
				<swiper-item v-for="(items, index) in newslist" :key="index">
					<scroll-view scroll-y class="list">
						<template v-if="items.list.length > 0">
							<!-- 图文列表 -->
							<block v-for="(item, index1) in items.list" :key="index1">
								<view v-if="item == '1'">
									<Recommend></Recommend>
								</view>
								<view v-else>{{item}}</view>
							</block>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
/***************文件引入**************/
import { get } from '../../request.js';
import topTab from '../../components/topTab/index.vue';
import Recommend from '../../components/tabContent/recommend.vue';
// import { uniRow,uniCol } from '@dcloudio/uni-ui';

/***************普通函数**************/
function test(params) {}

export default {
	/***************数据存放**************/
	data() {
		return {
			imgSrc: 'a',
			tabIndex: 0, // 选中的
			tabBars: [
				{ name: '推荐', id: 'tuijian' },
				{ name: '官方', id: 'guangfang' },
				{ name: '精品', id: 'jingping' },
				{ name: '华语', id: 'huayu' },
				{ name: '电子', id: 'dianzi' },
				{ name: '轻音乐', id: 'qingyinyue' },
				{ name: '摇滚', id: 'yaogun' },
				{ name: '民谣', id: 'minyao' },
			],
			swiperheight: 500, //高度
			newslist: [
				{ list: ['1'] },
				{ list: ['官方'] },
				{ list: ['精品'] },
				{ list: ['华语'] },
				{ list: ['电子'] },
				{ list: ['轻音乐'] },
				{ list: ['摇滚'] },
				{ list: ['民谣'] },
			],
		};
	},

	/***************注册组件**************/
	components: {
		topTab,
		Recommend,
	},

	/***************绑定的函数**************/
	methods: {
		//接口实例
		// gsBtn() {
		// 	let _this = this;
		// 	get('/artist/list', { type: 1, area: 96, initial: 'b' })
		// 	.then((res) => {
		// 		console.log(res);
		// 		this.imgSrc = res[1].data.artists[0].picUrl
		// 	});
		// },

		//接受子组件传过来的值点击切换导航
		tabtap(index) {
			this.tabIndex = index;
		},
		//滑动切换导航
		tabChange(e) {
			this.tabIndex = e.detail.current;
			console.log(e);
		},
	},

	/***************生命周期**************/
	onLoad() {
		uni.getSystemInfo({
			success: (res) => {
				let height = res.windowHeight - uni.upx2px(100);
				this.swiperheight = height;
			},
		});
	},
};
</script>

<style lang="scss" scoped>
.toptab {
	padding: 15upx 0;
	box-sizing: border-box;
	overflow: hidden;
	border:1px solid red;
}

.toptabTitle {
	font-size: 36upx;
	font-weight: bold;
	line-height: 60upx;
}
</style>
