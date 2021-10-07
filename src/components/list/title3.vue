<template>
  <view>
    <view class="top">
      <view class="val">排行榜</view>
      <view class="more">
        更多
        <uni-icons type="forward" size="13"></uni-icons>
      </view>
    </view>

    <swiper>
      <swiper-item>
        <view class="box">
          <view class="title">
            <view class="val">热度榜</view>
            <view class="icon">
              <uni-icons type="forward" size="18"></uni-icons>
            </view>
          </view>
          <view class="list" v-for="(item, index) in hy" :key="index" @click="btn(item)">
            <view class="num">
              <view class="item1">{{ index + 1 }}</view>
              <view class="item2">NEW</view>
            </view>
            <view class="img">
              <image :src="item.coverImgUrl" />
            </view>
            <view class="con">
              <view class="row1">{{ item.name }}</view>
              <view class="row2" v-if="item.playCount >= 100000000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 100000000) }}亿，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else-if="item.playCount >= 10000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 10000) }}万，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else>
                <view><image src="../../static/image/sjy.png" /></view>
                <view class="name"
                  >{{ item.playCount }} ，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="box">
          <view class="title">
            <view class="val">飙升榜</view>
            <view class="icon">
              <uni-icons type="forward" size="18"></uni-icons>
            </view>
          </view>
          <view class="list" v-for="(item, index) in gf" :key="index" @click="btn(item)">
            <view class="num">
              <view class="item1">{{ index + 1 }}</view>
              <view class="item2">NEW</view>
            </view>
            <view class="img">
              <image :src="item.coverImgUrl" />
            </view>
            <view class="con">
              <view class="row1">{{ item.name }}</view>
              <view class="row2" v-if="item.playCount >= 100000000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 100000000) }}亿，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else-if="item.playCount >= 10000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 10000) }}万，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else>
                <view><image src="../../static/image/sjy.png" /></view>
                <view class="name"
                  >{{ item.playCount }} ，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="box">
          <view class="title">
            <view class="val">ACG榜</view>
            <view class="icon">
              <uni-icons type="forward" size="18"></uni-icons>
            </view>
          </view>
          <view class="list" v-for="(item, index) in om" :key="index" @click="btn(item)">
            <view class="num">
              <view class="item1">{{ index + 1 }}</view>
              <view class="item2">NEW</view>
            </view>
            <view class="img">
              <image :src="item.coverImgUrl" />
            </view>
            <view class="con">
              <view class="row1">{{ item.name }}</view>
              <view class="row2" v-if="item.playCount >= 100000000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 100000000) }}亿，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else-if="item.playCount >= 10000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 10000) }}万，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else>
                <view><image src="../../static/image/sjy.png" /></view>
                <view class="name"
                  >{{ item.playCount }} ，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="box">
          <view class="title">
            <view class="val">摇滚榜</view>
            <view class="icon">
              <uni-icons type="forward" size="18"></uni-icons>
            </view>
          </view>
          <view class="list" v-for="(item,index) in lx" :key="index" @click="btn(item)">
            <view class="num">
              <view class="item1">{{ index+1 }}</view>
              <view class="item2">NEW</view>
            </view>
            <view class="img">
              <image :src="item.coverImgUrl" />
            </view>
            <view class="con">
              <view class="row1">{{ item.name }}</view>
              <view class="row2" v-if="item.playCount >= 100000000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 100000000) }}亿，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else-if="item.playCount >= 10000">
                <view><image src="../../static/image/sjy.png" /></view>
                <view
                  >{{ Math.floor(item.playCount / 10000) }}万，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
              <view class="row2" v-else>
                <view><image src="../../static/image/sjy.png" /></view>
                <view class="name"
                  >{{ item.playCount }} ，{{
                    item.subscribers[0].nickname
                  }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { get } from "../../request.js";
export default {
  data() {
    return {};
  },
  props: {
    hy: Array,
    gf: Array,
    om: Array,
    lx:Array
  },
  components: {},
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
.top {
  display: flex;
  justify-content: space-between;

  .val {
    font-weight: bold;
  }

  .more {
    border: 1px solid #cbcbcb;
    font-size: 10upx;
    padding: 5upx 20upx;
    border-radius: 30upx;
    transform: scale(0.9);
  }
}

swiper {
  height: 500upx;
  //   border:1px solid red;
  width: 100%;
}

swiper-item {
  // border:1px solid red;
  // width:635upx !important;
}

.box {
  border: 1px solid #d9d9d9;
  border-radius: 30upx;
  width: 650upx;
  height: 470upx;
  margin-top: 20upx;
  .title {
    display: flex;
    width: 150upx;
    margin: 0 auto;
    margin-top: 40upx;
    .val {
      font-size: 36upx;
      font-weight: bold;
    }
  }

  .list {
    display: flex;
    font-size: 34upx;
    margin-top: 20upx;
    .num {
      width: 100upx;
      text-align: center;
      margin-top: 10upx;
      .item1 {
        color: red;
        font-weight: bold;
      }
      .item2 {
        font-size: 10upx;
        color: green;
        transform: scale(0.7);
      }
    }
    .img {
      width: 100upx;
      height: 100upx;
      border-radius: 20upx;
      margin-right: 30upx;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .con {
      font-size: 32upx;
      margin-top: 10upx;
      .row1 {
        width: 340upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      .row2 {
        font-size: 10upx;
        color: #6c6c6c;
        transform: scale(0.9);
        display: flex;

        .name {
          // border:1px solid red;
        }

        image {
          width: 25upx;
          height: 25upx;
          margin-top: 6upx;
          margin-right: 4upx;
          // border:1px solid red;
        }
      }
    }
  }
}
</style>
