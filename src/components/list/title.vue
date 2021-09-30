<template>
	<view>
		<view v-if="type == 1" style="font-weight: bold">
			<text class="iocn">
				<uni-icons type="refreshempty" size="30"></uni-icons>
			</text>
			<text class="title">{{ title }} </text>
		</view>
		<view v-else style="font-weight: bold">{{ title }}</view>
		<view>
			<List :list="list"></List>
		</view>
	</view>
</template>
<script>
import List from '../list/list.vue';
export default {
	data() {
		return {};
	},
	props: {
		title: String,
		list: Array,
		type: Number,
	},
	components: {
		List,
	},
	created() {},
	computed: {},
	methods: {},
};
</script>
<style lang="scss" scoped>
.iocn{
    background-color: red;
    display: inline-block;
    line-height: 40upx;
}
.title {
	padding-left: 15upx;
}
</style>
