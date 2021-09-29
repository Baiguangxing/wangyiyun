<template>
	<view class="app">
		<view>接口测试</view>
		<button @click="btn">点击测试</button>

		<uni-badge text="1"></uni-badge>
		<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
	</view>
</template>

<script>
import { uniBadge } from '@dcloudio/uni-ui';

export default {
	components: { uniBadge },
	methods: {
		btn() {
			uni.request({
				url: 'http://api.tianapi.com/txapi/dyvideohot/index?key=APIKEY',
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.app {
	button {
		color: $uni-color-primary;
	}
}
</style>
