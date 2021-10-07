<template>
  <view class="list">
    <view class="box" v-for="(item, index) in list" :key="index" @click="btn(item)">
      <view class="play" v-if="item.playCount >= 100000000"
        >{{ Math.floor(item.playCount / 100000000) }}亿</view
      >
      <view class="play" v-else-if="item.playCount >= 10000"
        >{{ Math.floor(item.playCount / 10000) }}万</view
      >
      <view class="play" v-else>{{ item.playCount }}</view>
      <image class="img" :src="item.coverImgUrl" />
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>
<script>
import { get } from "../../request.js";
export default {
  data() {
    return {};
  },

  props: {
    list: Array,
  },

  created() {},
  computed: {},
  methods: {
    btn(item) {
      get("/playlist/detail", { id: item.id }).then((res) => {
        console.log(res[1].data.playlist);
        this.$store.state.playlistDat = res[1].data.playlist;
        this.$store.state.trackIds = res[1].data.playlist.trackIds

        uni.navigateTo({
          url: "/pages/playlist/playlist",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .box {
    position: relative;
    width: 33.33%;
    margin-top: 30upx;
    text {
      margin-top: 10upx;
      line-height: 40upx;
      display: block;
      font-size: 26upx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .img {
      display: block;
      width: 210upx;
      height: 210upx;
      border-radius: 20upx;
    }
    .play {
      position: absolute;
      z-index: 10;
      right: 30upx;
      top: 10upx;
      font-size: 20upx;
      background-color: #919191;
      padding: 0 15upx;
      border-radius: 30upx;
      color: white;
    }
  }
}
</style>
