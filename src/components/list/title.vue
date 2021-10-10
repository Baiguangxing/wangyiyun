<template>
  <view>
    <view class="title" @click="flushBtn">
      <view class="icon">
        <!-- <uni-load-more :status="'loading'" iconType="circle" :contentText="contentText"></uni-load-more> -->
        <uni-icons type="refreshempty" size="30"></uni-icons>
      </view>
      <view class="txt">
        <view class="item">{{ title }}</view>
        <view>的专属歌单</view>
      </view>
    </view>
    <view>
      <view class="list" v-if="data.length === 0">
        <view
          class="box"
          v-for="(item, index) in list"
          :key="index"
          @click="btn(item)"
        >
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

      <view class="list" v-else>
        <view
          class="box"
          v-for="(item, index) in data"
          :key="index"
          @click="btn(item)"
        >
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
    return {
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: " ",
        contentnomore: "没有更多数据了",
      },
      data: [],
    };
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
        this.$store.state.trackIds = res[1].data.playlist.trackIds;

        uni.navigateTo({
          url: "/pages/playlist/playlist",
        });
      });
    },
    flushBtn() {
      console.log("刷新");
      get("/personalized", {}).then((res) => {
        //推荐歌单列表
        let data = res[1].data.result; //全部数据
        let data1 = []; //前六条数据
        let sjNum = this.$store.state.sjNum + 1;
        if (sjNum > 4) {
          sjNum = 1;
        }
        for (let i = 6 * (sjNum - 1); i < 6 * sjNum; i++) {
          data1.push(data[i]);
        }
        this.data = data1;
        this.$store.state.sjNum = sjNum;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  .icon {
    //@debugtransform-origin: center center;
    //animation: dong 1s linear infinite;
    display: flex;
    margin-top: -4upx;
    align-items: center;
    //background-color: red;
    width: 50upx;
    height: 50upx;
    text-align: center;
  }
  .txt {
    font-weight: bold;
    font-size: 34upx;
    display: flex;
    .item {
      width: 350upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .box {
    position: relative;
    width: 33.33%;
    margin-top: 20upx;
    text {
      margin-top: 8upx;
      line-height: 38upx;
      display: block;
      font-size: 26upx;
	  width:210upx;
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
      image {
        width: 28upx;
        height: 28upx;
        display: block;
        margin-top: 6upx;
        margin-left: -18upx;
        margin-right: 10upx;
      }
    }
  }
}

@keyframes dong {
  from {
    transform: rotate(0deg);
    transform-origin: center center;
  }
  to {
    transform: rotate(360deg);
    transform-origin: center center;
  }
}
</style>
