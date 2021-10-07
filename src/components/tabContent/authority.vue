<template>
  <view class="content">
    <List :list="data"></List>
    <view class="footer">暂无更多歌单</view>
  </view>
</template>

<script>
import List from "../list/list.vue";
export default {
  components: {
    List,
  },
  props: {
    data: Array,
  },
};
</script>

<style lang="scss">
.content {
  overflow: auto;
  height: 1050upx;
  padding: 0 30upx;
  .footer{
    //   border:1px solid red;
      text-align: center;
      font-size: 34upx;
      color:#686868;
      padding:30upx 0;
  }
}
</style>