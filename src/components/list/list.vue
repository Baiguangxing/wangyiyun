<template>
	<view class="list">
		<view class="box" v-for="(item, index) in list" :key="index">
            <view class="play">5亿</view>
			<image class="img" :src="item.src" />
			<text>{{ item.value }}</text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
		};
	},

	props: {
		list:Array
	},

	created() {},
	computed: {},
	methods: {},
};
</script>
<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.box {
        position: relative;
		width: 33.33%;
		margin-top: 30upx;
		text {
			margin-top: 10upx;
			line-height: 40upx;
			display: block;
			font-size: 26upx;
		}
		.img {
			display: block;
			width: 210upx;
			height: 210upx;
			border-radius: 20upx;
		}
        .play{
            position: absolute;
            z-index: 10;
            right: 30upx;
            top:10upx;
            font-size:20upx;
            background-color: #919191;
            padding:0 15upx;
            border-radius: 30upx;
            color:white;
        }
	}
}
</style>
