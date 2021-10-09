<template>
  <view>
    <view style="font-weight: bold;font-size:34upx">{{ title }}</view>
    <view>
      <view class="list">
        <view class="box" v-for="(item, index) in list" :key="index" @click="btn(item)">
          <view class="play" v-if="item.playCount >= 100000000">
            <view><image src="../../static/image/sj.png" /></view>
            <view>{{ Math.floor(item.playCount / 100000000) }}亿</view>
          </view>
          <view class="play" v-else-if="item.playCount >= 10000">
            <view><image src="../../static/image/sj.png" /></view>
            <view>{{ Math.floor(item.playCount / 10000) }}万</view>
          </view>
          <view class="play" v-else>
            <view><image src="../../static/image/sj.png" /></view>
            <view>{{ item.playCount }}</view>
          </view>
          <image class="img" :src="item.picUrl" />
          <text>{{ item.name }}</text>
        </view>
      </view>
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
    title: String,
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
.iocn {
  line-height: 56upx;
  font-weight: 300;
}
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
      display: flex;
      position: absolute;
      z-index: 10;
      right: 20upx;
      top: 5upx;
      font-size: 20upx;
      background-color: #919191;
      padding: 5upx 25upx;
      border-radius: 30upx;
      color: white;
      transform: scale(0.85);
      image{
        width:28upx;
        height:28upx;
        display: block;
        margin-top:6upx;
        margin-left: -18upx;
        margin-right:10upx;
      }
    }
  }
}
</style>
