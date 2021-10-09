<template>
	<view style="padding:30upx">
	<view @click="open">
					弹出层
				</view>
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
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="tc_bg">
				<swiper class="swiper">
					<swiper-item>
						<view class="item1">A</view>
					</swiper-item>
					<swiper-item>
						<view class="item2">B</view>
					</swiper-item>
					<swiper-item>
						<view class="item3">
							<view class="item_row1">
								当前播放
								<text> (49)</text>
							</view>
							<view class="item_row2">
								<view class="left">
									<view class="left_row1"
										><image src="../../static/image/xh_h.png"
									/></view>
									<view class="left_row2">列表循环</view>
								</view>
								<view class="right">
									<view calss="right_row1">
										<image src="../../static/image/sc_h1.png" />
										<text>收藏全部</text>
									</view>
									<view calss="right_row2">|</view>
									<view calss="right_row3">
										<image src="../../static/image/sc_h.png" />
									</view>
								</view>
							</view>
							<view class="item_row3">歌曲列表</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</uni-popup>
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
		//弹出框
		open() {
			this.$refs.popup.open();
		},
	},
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 100vh;
	margin-top: -20upx;
}

.row {
	margin-top: 70upx;
	&:first-child {
		margin-top: 0;
	}
}

.bottom {
	margin-top: 30upx;
	height: 400upx;
	text-align: center;
	font-size: 30upx;
	color: #505050;
}

.tc_bg{
	border:1px solid red;
	width:100%;
	height:800upx;
	.swiper{
		background-color: red;
		height:800upx;
		width:100%;

		.item1{
			
		}
		.item2{
			
		}
		.item3{
			background-color: white;
			.item_row1{
				font-size: 32upx;
				text{
					font-size: 20upx;
					color:#858585;
				}
			}
			.item_row2{
				display: flex;
				justify-content: space-between;
				border:1px solid red;
				.left{
					display: flex;
					font-size: 20upx;
					.left_row1{
						image{
							width:35upx;
							height:35upx;
						}
					}
					.left_row2{
						margin-left:10upx;
					}
				}
				.right{
					font-size: 20upx;
					display: flex;
					justify-content: space-between;
					.right_row1{
						border:1px solid red;
						background-color: red;
						image{
							width:30upx;
							height:30upx;
						}
					}
					.right_row2{
						
					}
					.right_row3{
						image{
							width:30upx;
							height:30upx;
						}
					}
				}
			}
		}
	}
}
</style>
