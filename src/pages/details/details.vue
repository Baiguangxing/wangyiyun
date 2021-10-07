<template>
  <view class="main">
    <view class="top">
      <view class="left" @click="fhBtn">
        <uni-icons type="arrowdown" size="25" color="white"></uni-icons>
      </view>
      <view class="middle">
        <view class="title">{{ songs_xq[0].al.name }}</view>
        <view class="name">
          {{ songs_xq[0].ar[0].name }}
          <text
            ><uni-icons type="plusempty" size="10" color="#FFF"></uni-icons
          ></text>
        </view>
      </view>
      <view class="right">
        <view class="img">
          <image src="../../static/image/r.jpg" />
          <view class="text" v-if="mr">
            <view>品味相似度99%</view>
            <view @click="mrBtn">
              <uni-icons type="closeempty" size="10" color="#fff"></uni-icons>
            </view>
          </view>
        </view>
        <view>
          <uni-icons type="paperplane" size="25" color="white"></uni-icons>
        </view>
      </view>
    </view>

    <view class="content" @click="conBtn">
      <view class="box1" v-if="show">
        <view class="dh1">
          <image :class="bf ? '' : 'image1'" src="../../static/image/bj3.png" />
        </view>
        <view class="dh2">
          <view :class="bf ? 'img run' : 'img pau'">
            <image :src="songs_xq[0].al.picUrl" />
          </view>
          <image src="../../static/image/bj2.png" />
        </view>
      </view>

      <view class="box2" v-else>
        <view class="str">{{ lrc }}</view>
      </view>
    </view>

    <view class="footer">
      <view class="row1">
        <view><uni-icons type="heart" size="25" color="#fff"></uni-icons></view>
        <view
          ><uni-icons type="download" size="25" color="#fff"></uni-icons
        ></view>
        <view><uni-icons type="mic" size="25" color="#fff"></uni-icons></view>
        <view><uni-icons type="chat" size="25" color="#fff"></uni-icons></view>
        <view class="i"
          ><uni-icons type="more-filled" size="25" color="#fff"></uni-icons
        ></view>
      </view>
      <view class="row2">
        <view class="font">00:00</view>
        <view class="progress">
          <slider
            class="line"
            :value="10"
            :min="0"
            :max="100"
            @change="sliderChange"
            block-size="15"
            backgroundColor="rgba(255,255,255,.5)"
            activeColor="rgba(255,255,255,.5)"
          />
        </view>
        <view class="font">04:39</view>
      </view>
      <view class="row3">
        <view @click="xhBtn">
          <view v-if="xh == 1"><image src="../../static/image/xh2.png" /></view>
          <view v-if="xh == 2"><image src="../../static/image/sj_.png" /></view>
          <view v-if="xh == 3"><image src="../../static/image/xh1.png" /></view>
        </view>
        <view @click="sysBtn">
          <image src="../../static/image/sys.png" />
        </view>
        <view @click="bfBtn">
          <view v-if="bf"><image src="../../static/image/bf_2.png" /></view>
          <view v-else><image src="../../static/image/bf_.png" /></view>
        </view>
        <view @click="xysBtn">
          <image src="../../static/image/xys.png" />
        </view>
        <view>
          <image src="../../static/image/lb.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import func from "vue-editor-bridge";
import { get } from "../../request.js";
const innerAudioContext = uni.createInnerAudioContext();//创建播放器

export default {
  data() {
    return {
      mr: true,
      show: true,
      id: "",
      ids: [],
      bf: true,
      xh: 1,
      url: "",
      lrc: "",
      songs_xq: [
        // songs_xq[0].al.picUrl
        // songs_xq[0].ar[0].name
        { al: { name: "" }, ar: [{ name }] },
      ],
    };
  },
  methods: {
    //播放处理事件
    bfHandle(url) {
      innerAudioContext.autoplay = true; //是否自动开始播放
      innerAudioContext.src = url; //播放地址
      innerAudioContext.onPlay(() => {
        //开始播放
        console.log("开始播放-------------------------");
      });
      innerAudioContext.onError((res) => {
        //音频播放错误事件
        console.log("播放错误---------------------------");
        console.log(res.errMsg);
        console.log(res.errCode);
      });
      innerAudioContext.onEnded((res) => {
        console.log("播放结束-----------------------------");
        this.xysBtn();//下一首
      });

      innerAudioContext.onTimeUpdate((res) => {
        console.log("音频播放进度更新事件------------------");
      });

      innerAudioContext.onWaiting((res) => {
        console.log("音频加载中事件------------------------");
      });

      innerAudioContext.onSeeking((res) => {
        console.log("音频进行 seek 操作事件-----------------");
      });

      innerAudioContext.onSeeked((res) => {
        console.log("音频完成 seek 操作事件-------------------");
      });
      // console.log(this.url)
    },
    //播放音乐
    playHandle() {
      let songlistIds = this.$store.state.trackIds;
      let index = this.$store.state.index;

      get("/lyric", { id: songlistIds[index].id }).then((res) => {
        //获取歌词
        console.log(res[1].data,"歌词数据")
        if(res[1].data.lrc == undefined){
          this.lrc = "暂无歌词"
        }else{
          this.lrc = res[1].data.lrc.lyric;
        }
      });

      get("/check/music", { id: songlistIds[index].id }).then((res) => {
        //歌曲是否有权
        if (res[1].data.success) {
          get("/song/detail", { ids: songlistIds[index].id }).then((res) => {
            //获取歌曲详情
            this.songs_xq = res[1].data.songs;
          });

          get("/song/url", { id: songlistIds[index].id }).then((res) => {
            //获取音乐url
            this.url = res[1].data.data[0].url;
            this.bfHandle(this.url);
          });
        } else {
          console.log("暂无版权");
          this.xysBtn();//下一首
        }
      });
    },
    //暂停或播放
    bfBtn() {
      this.bf = !this.bf;
      if (this.bf) {
        innerAudioContext.play();
      } else {
        innerAudioContext.pause();
      }
    },
    //循环方式
    xhBtn() {
      if (this.xh >= 3) {
        this.xh = 1;
      } else {
        this.xh += 1;
      }
    },
    //返回
    fhBtn() {
      uni.navigateTo({
        url: "/pages/playlist/playlist",
      });
    },
    conBtn() {
      this.show = !this.show;
    },
    mrBtn() {
      this.mr = !this.mr;
    },
    //下一首
    xysBtn() {
      let songlistIds = this.$store.state.trackIds;
      let id = this.$store.state.index + 1;
      if (id > songlistIds.length - 1) {
        id = 0;
      }
      this.$store.state.index = id;
      this.playHandle();
    },
    //上一首
    sysBtn() {
      let songlistIds = this.$store.state.trackIds;
      let id = this.$store.state.index - 1;
      if (id < 0) {
        id = songlistIds.length - 1;
      }
      this.$store.state.index = id;
      this.playHandle(id);
    },
  },
  onLoad() {
    this.id = this.$store.state.index;
    this.playHandle(this.id); //音乐播放
  },
};

// 秒格式化 00:00 格式
function formatTime(second) {
  var sec = second % 60;
  var min = Math.floor(second / 60);
  if (min.toString().length < 2) {
    min = "0" + min;
  }
  if (sec.toString().length < 2) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
}

// 格式化时间戳
function formatDate(value) {
  var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}
</script>

<style lang="scss">
.main {
  background-color: #788497;
  height: 100vh;
  padding: 0 30upx;
}

.top {
  display: flex;
  height: 100upx;
  padding-top: 20upx;
  .left {
    width: 15%;
  }
  .middle {
    width: 50%;
    margin: 0 5%;
    font-size: 34upx;
    color: white;
    text-align: center;

    .title {
      overflow: hidden;
      white-space: nowrap;
    }

    .name {
      font-size: 20upx;
      text-align: center;

      text {
        background-color: #959595;
        display: inline-block;
        padding: 0 5upx;
        border-radius: 30upx;
        transform: scale(0.8);
      }
    }
  }
  .right {
    width: 25%;
    display: flex;
    justify-content: space-between;
    .img {
      width: 70upx;
      height: 70upx;
      position: relative;

      .text {
        display: flex;
        justify-content: space-between;
        background-color: #ab0130;
        color: white;
        position: absolute;
        top: 100upx;
        left: -150upx;
        z-index: 10;
        font-size: 20upx;
        width: 250upx;
        padding: 12upx 20upx;
        border-radius: 30upx;
        &::before {
          content: "";
          display: block;
          border: 10upx solid #ab0130;
          position: absolute;
          top: -16upx;
          left: 180upx;
          border-color: transparent;
          border-bottom-color: #ab0130;
          border-bottom-width: 15upx;
          border-top: none;
        }
      }

      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid red;
      }
    }
  }
}

.content {
  // border: 1px solid red;
  overflow: hidden;
  width: 100%;
  height: 930upx;
  .box1 {
    .dh1 {
      position: relative;
      border: 1px solid transparent;

      image {
        width: 250upx;
        height: 250upx;
        position: absolute;
        left: 300upx;
        top: 0;
        transform: rotate(20deg);
        transform-origin: left top;
        z-index: 10;
        &.image1 {
          transform: rotate(0deg);
        }

        transition: all 0.5s;
      }
    }
    .dh2 {
      // border: 1px solid red;
      width: 100%;
      height: 620upx;
      margin-top: 180upx;
      position: relative;
      transform: scale(0.9);

      .img {
        animation: mydonghua2 15s linear infinite;
        width: 430upx;
        height: 430upx;
        position: absolute;
        border-radius: 50%;
        top: 100upx;
        left: 130upx;
        z-index: 10;
        overflow: hidden;

        transform: all 0.5s;

        image {
          width: 100%;
          height: 100%;
          margin-left: 0;
        }
      }

      .pau {
        animation-play-state: paused;
      }

      .run {
        animation-play-state: running;
      }
    }

    image {
      width: 100%;
      height: 100%;
      margin-left: 30upx;
    }
  }

  .box2 {
    .str {
      color: white;
      font-size: 30upx;
      text-align: center;
      line-height: 90upx;
    }
  }
}

.footer {
  // border: 1px solid red;
  padding: 0 30upx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 250upx;

  .img {
    width: 100%;
    height: 100%;

    image {
      width: 100%;
      // height:100%;
      height: 100%;
    }
  }

  .row1 {
    display: flex;
    justify-content: space-around;
    .i {
      transform: rotate(90deg);
    }
  }

  .row2 {
    display: flex;
    justify-content: space-between;
    margin-top: 30upx;
    color: white;

    .font {
      font-size: 20upx;
    }

    .progress {
      width: 100%;
      .line {
        margin-top: -2px;
      }
    }
  }

  .row3 {
    display: flex;
    justify-content: space-around;
    margin-top: 40upx;

    image {
      width: 50upx;
      height: 50upx;
    }
  }
}

@keyframes mydonghua1 {
}

@keyframes mydonghua2 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>