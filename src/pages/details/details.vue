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
        <view style="line-height:70upx">
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

      <scroll-view
        :scroll-with-animation="true"
        scroll-y="true"
        :scroll-top="scrollTop"
        class="box2"
        v-else
      >
        <view class="str_box">
          <view
            :class="scroNum == index ? 'bgx' : 'str'"
            v-for="(item, index) in str_arr"
            :key="index"
          >
            {{ item }}
          </view>
        </view>
      </scroll-view>
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
        <view class="font">{{ date }}</view>
        <view class="progress">
          <slider
            class="line"
            :value="second"
            :min="0"
            :max="Math.floor(this.songs_xq[0].dt / 1000)"
            @change="sliderChange"
            block-size="15"
            backgroundColor="rgba(255,255,255,.5)"
            activeColor="rgba(255,255,255,.5)"
          />
        </view>
        <view class="font">{{ endDate }}</view>
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
        <view @click="open">
          <image src="../../static/image/lb.png" />
        </view>
      </view>
    </view>

    <uni-popup ref="popup" type="bottom">
      <uni-swiper-dot
        :info="info"
        mode="dot"
        :current="current"
        :dotsStyles="dotsStyles"
		style="height:50upx"
      >
        <swiper class="swiper-box" @change="change">
          <swiper-item></swiper-item>
        </swiper>
      </uni-swiper-dot>

      <view class="tc_bg">
        <swiper
          class="swiper"
          @change="swiperChange"
          :current="current"
          previous-margin="20rpx"
          next-margin="20rpx"
        >
          <swiper-item>
            <view class="tc_box">
              <view :class="current !== 0 ? 'tc_box1 tc_box2' : 'tc_box1'">
                <view class="tc_row1">历史播放 </view>
                <view class="tc_row2">
                  <view class="tc_left xz">
                    <view>歌单[孤独的时候别听民谣]</view>
                  </view>
                  <view class="tc_right">
                    <view><image src="../../static/image/sc_h1.png" /></view>
                    <view>收藏全部</view>
                    <view class="link">|</view>
                    <view><image src="../../static/image/sc_h.png" /></view>
                  </view>
                </view>
                <view class="tc_row3">
                  <view class="tc_item_box" style="margin-top:-5upx;">
                    <view class="tc_item" v-for="item in 10" :key="item">
                      <view class="tc_left" style="margin-top:20upx">
						  以爱为囚 - <text> 满舒克</text>
						</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="tc_box">
              <view :class="current !== 1 ? 'tc_box1 tc_box2' : 'tc_box1'">
                <view class="tc_row1">上次播放</view>
                <view class="tc_row2">
                  <view class="tc_left xz">
                    <view>歌单[孤独的时候别听民谣]</view>
                  </view>
                  <view class="tc_right">
                    <view><image src="../../static/image/sc_h1.png" /></view>
                    <view>收藏全部</view>
                    <view class="link">|</view>
                    <view><image src="../../static/image/sc_h.png" /></view>
                  </view>
                </view>
                <view class="tc_row3">
                  <view class="tc_item_box" style="margin-top:-5upx">
                    <view class="tc_item" v-for="item in 10" :key="item">
                      <view class="tc_left" style="margin-top:20upx">
						  以爱为囚 - <text> 满舒克</text>
						</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="tc_box">
              <view :class="current !== 2 ? 'tc_box1 tc_box2' : 'tc_box1'">
                <view class="tc_row1"
                  >当前播放 <text>({{ songItem.length }})</text></view
                >
                <view class="tc_row2">
                  <view class="tc_left">
                    <view><image src="../../static/image/xh_h.png" /></view>
                    <view>列表循环</view>
                  </view>
                  <view class="tc_right">
                    <view><image src="../../static/image/sc_h1.png" /></view>
                    <view>收藏全部</view>
                    <view class="link">|</view>
                    <view><image src="../../static/image/sc_h.png" /></view>
                  </view>
                </view>
                <view class="tc_row3">
                  <view class="tc_item_box">
                    <view
                      class="tc_item"
                      v-for="(item, index) in songItem"
                      :key="index"
                      @click="songItemList(index)"
                    >
                      <view class="tc_left" v-if="i_id == index">
                        <view class="tc_left_box">
                          <view class="ling1">
                            <view class="i1">
                              <image src="../../static/image/bf_hong.png" />
                            </view>
                            <view class="i2"
                              >{{ item.songs[0].al.name }} -
                              <text> {{ item.songs[0].ar[0].name }}</text></view
                            >
                          </view>
                          <view class="ling2">
                            <view class="i3">播放来源</view>
                          </view>
                        </view>
                      </view>

                      <view class="tc_left" v-else>
                        <view class="tc_left_box1">
                          {{ item.songs[0].al.name }} -
                          <text> {{ item.songs[0].ar[0].name }}</text>
                        </view>
                      </view>

                      <view class="tc_right">
                        <image src="../../static/image/x.png" />
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// import func from "vue-editor-bridge";
import { get } from "../../request.js";
// const innerAudioContext = uni.createInnerAudioContext(); //创建播放器

export default {
  data() {
    return {
      scrollTop: 0,
      scroNum: 0,
      gcsjArr: [],
      mr: true,
      show: true,
      id: "",
      ids: [],
      bf: true,
      xh: 1,
      url: "",
      str_arr: [],
      second: 0,
      date: "00:00",
      endDate: "",
      timer: null,
      songs_xq: [{ al: { name: "" }, ar: [{ name }] }],
      dotsStyles: {
        border: "none",
        selectedBackgroundColor: "#fff",
        selectedBorder: "none",
      },
      current: 2,
      info: [1, 2, 3],
      songItem: this.$store.state.songlist,
      i_id: this.$store.state.index,
    };
  },
  methods: {
    //播放处理事件
    bfHandle(url) {
      this.$store.state.creatA.autoplay = true; //是否自动开始播放
      this.$store.state.creatA.src = url; //播放地址
      this.$store.state.creatA.onPlay(() => {
        //开始播放
        console.log("开始播放-------------------------");
        let _this = this;

        let data = this.gcsjArr;
        let len = data.length;

        if (!this.timer) {
          this.timer = setInterval(() => {
            //开始计时
            _this.second++;
            _this.date = formatTime(_this.second);
            _this.second = _this.second;

            for (let i = 0; i < len; i++) {
              if (data[i][0] === _this.date && data[i][1]) {
                // _this.scrollTop = 38 * i;
                // _this.scroNum = i;
                // // console.log(i+"-------------"+_this.scrollTop)
                // console.log(data, i);
                // console.log(_this.str_arr, i);
                // console.log(data[i][0], "所有时间");
                // console.log(_this.date, "当前时间");
                // console.log(data[i][0] === _this.date);
                // console.log(i, "当前序号");
                _this.scroNum = i;
                _this.scrollTop = 50 * i;
                // console.log(_this.scroNum, "赋值成功？");
                // console.log(_this.gcsjArr);
                // console.log("---------------------");
              }
            }
          }, 1000);
        }
      });
      this.$store.state.creatA.onPause((res) => {
        //音频暂停事件
        console.log("播放暂停---------------------------");
      });
      this.$store.state.creatA.onError((res) => {
        //音频播放错误事件
        console.log("播放错误---------------------------");
        console.log(res.errMsg);
        console.log(res.errCode);
      });
      this.$store.state.creatA.onEnded((res) => {
        console.log("播放结束-----------------------------");
        this.xysBtn(); //下一首
      });

      this.$store.state.creatA.onTimeUpdate((res) => {
        // console.log('音频播放进度更新事件------------------');
      });

      this.$store.state.creatA.onWaiting((res) => {
        console.log("音频加载中事件------------------------");
      });

      this.$store.state.creatA.onSeeking((res) => {
        console.log("音频进行 seek 操作事件-----------------");
      });

      this.$store.state.creatA.onSeeked((res) => {
        console.log("音频完成 seek 操作事件-------------------");
      });
      // console.log(this.url)
    },

    //播放音乐
    playHandle() {
      let songlistIds = this.$store.state.trackIds;
      let index = this.$store.state.index;

      // console.log("获取歌词的测试id:"+songlistIds[index].id) //459063003
      get("/lyric", { id: songlistIds[index].id }).then((res) => {
        //获取歌词
        // console.log(res[1].data, '歌词数据');
        if (res[1].data.lrc == undefined) {
          this.lrc = "暂无歌词";
          console.log("暂无歌词");
        } else {
          //获取歌词 --> 成功
          let data = res[1].data.lrc.lyric;
          //   data = data.replace(/\s*/g,"");
          //   console.log(data, "歌词完整");
          let arr = data.split(
            /\[[0-9][0-9]:[0-9][0-9].[0-9][0-9]\]|\[[0-9][0-9]:[0-9][0-9].[0-9][0-9][0-9]\]/
          ); //[00:17.02]
          arr.shift();
          this.str_arr = arr;
          //   console.log(arr, "歌词");
          //获取时间
          var date = data.match(/[0-9][0-9]:[0-9][0-9]/g);
          //   console.log(date, "时间");
          let gcsjArr = [];

          for (let i = 0; i < date.length; i++) {
            let a = [];
            a.push(date[i], arr[i]);
            gcsjArr.push(a);
          }

          this.gcsjArr = gcsjArr;
          // console.log(gcsjArr,"歌词组合")
        }
      });

      get("/check/music", { id: songlistIds[index].id }).then((res) => {
        //歌曲是否有权
        if (res[1].data.success) {
          get("/song/detail", { ids: songlistIds[index].id }).then((res) => {
            //获取歌曲详情
            console.log(res[1].data, "歌曲详情");
            this.songs_xq = res[1].data.songs;
            this.endDate = formatTime(Math.floor(this.songs_xq[0].dt / 1000));
          });

          get("/song/url", { id: songlistIds[index].id }).then((res) => {
            //获取音乐url
            // console.log(res[1].data,"音乐url")
            this.url = res[1].data.data[0].url;
            this.bfHandle(this.url);
          });
        } else {
          console.log("暂无版权");
          uni.showToast({
            title: "暂无版权，3秒后播放下一首",
            duration: 3000,
            icon: "none",
          });
          let _this = this;
          setTimeout(function () {
            _this.xysBtn(); //下一首
          }, 3000);
        }
      });
    },
    //进度拖动事件
    sliderChange(e) {
      this.second = e.detail.value;
      this.$store.state.creatA.seek(this.second);
    },
    //暂停或播放
    bfBtn() {
      this.bf = !this.bf;
      let _this = this;
      let data = this.gcsjArr;
      let len = data.length;
      if (this.bf) {
        //播放
        if (!this.timer) {
          this.timer = setInterval(() => {
            //开始计时
            _this.second++;
            _this.date = formatTime(_this.second);
            _this.second = _this.second;

            for (let i = 0; i < len; i++) {
              if (data[i][0] === _this.date && data[i][1]) {
                // _this.scrollTop = 38 * i;
                // _this.scroNum = i;
                // // console.log(i+"-------------"+_this.scrollTop)
                // console.log(data, i);
                // console.log(_this.str_arr, i);
                // console.log(data[i][0], "所有时间");
                // console.log(_this.date, "当前时间");
                // console.log(data[i][0] === _this.date);
                // console.log(i, "当前序号");
                _this.scroNum = i;
                _this.scrollTop = 50 * i;
                // console.log(_this.scroNum, "赋值成功？");
                // console.log(_this.gcsjArr);
                // console.log("---------------------");
              }
            }
          }, 1000);
        } else {
          this.timer;
        }
        this.$store.state.creatA.play();
      } else {
        //暂停
        clearInterval(this.timer);
        this.timer = null;
        this.$store.state.creatA.pause();
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
      // this.timer= null;
      this.second = 0;
      this.date = "00:00";
      let songlistIds = this.$store.state.trackIds;

      let id = this.$store.state.index + 1;
      if (id > songlistIds.length - 1) {
        id = 0;
      }
      this.$store.state.index = id;
      this.i_id = this.$store.state.index;
      this.playHandle();
    },
    //上一首
    sysBtn() {
      this.second = 0;
      this.date = "00:00";
      let songlistIds = this.$store.state.trackIds;
      let id = this.$store.state.index - 1;
      if (id < 0) {
        id = songlistIds.length - 1;
      }
      this.$store.state.index = id;
      this.playHandle(id);
    },
    //弹出框
    open() {
      this.$refs.popup.open();
    },
    //滑动切换改变
    swiperChange(e) {
      this.current = e.detail.current;
    },
    songItemList(i) {
      console.log(i, "获取歌曲列表id");
      this.i_id = i;
      this.$store.state.index = i;
	  this.second = 0;
      this.date = "00:00";
      let songlistIds = this.$store.state.trackIds;
      this.playHandle();
    },
  },
  onLoad() {
    this.playHandle(); //音乐播放
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
          top: -15upx;
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
    // border: 1px solid red;
    height: 927upx;
    position: relative;
    .str_box {
      padding-top: 370upx;
      padding-bottom: 450upx;
      .str {
        text-align: center;
        color: #c4c4c4;
        font-size: 32upx;
        margin-top: 60upx;
      }
      .bgx {
        color: white;
        text-align: center;
        font-size: 32upx;
        margin-top: 60upx;
      }
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
    margin-top: 30upx;

    image {
      width: 50upx;
      height: 50upx;
    }
  }
}

.tc_bg {
  height: 800upx;
  .swiper {
    height: 800upx;
    swiper-item {
    }
    .tc_box {
      // border: 1px solid red;
      padding: 0 5upx;
      margin: 0 5upx;
      .tc_box1 {
        //transition: all .1s ease-in-out;
        background-color: white;
        border-radius: 40upx;
        overflow: hidden;
        height: 710upx;
        padding: 30upx;

        .tc_row1 {
          font-weight: bold;
          font-size: 32upx;
          text {
            font-size: 20upx;
            color: #959595;
          }
        }

        .tc_row2 {
          display: flex;
          justify-content: space-between;
          font-size: 25upx;
          margin-top: 20upx;
          .tc_left {
            display: flex;
            justify-content: space-between;
            width: 135upx;
			
            image {
              width: 30upx;
              height: 30upx;
              margin-top: 0upx;
            }
			
          }

		 .xz{
				width:300upx;
				color:#767676;
			}

          .tc_right {
            display: flex;
            justify-content: space-between;
            font-size: 25upx;
            width: 250upx;
            margin-right: 10upx;
            .link {
              color: #e1e1e1;
              font-weight: 100;
              margin-left: 20upx;
            }
            image {
              width: 30upx;
              height: 30upx;
              margin-top: 3upx;
              &:first-child {
                margin-left: 20upx;
              }
            }
          }
        }

        .tc_row3 {
          margin-top: 26upx;
          .tc_item_box {
            overflow: auto;
            height: 650upx;
            .tc_item {
              display: flex;
              justify-content: space-between;
              margin-top: 12upx;
              .tc_left {
                font-size: 28upx;

                .tc_left_box {
                  display: flex;
                  justify-content: space-between;
                  width: 550upx;
                  overflow: visible;

                  .ling1 {
                    display: flex;
                    .i1 {
                      margin-right: 20upx;
                      image {
                        width: 25upx;
                        height: 25upx;
                      }
                    }
                    .i2 {
                      color: #fe3a3b;
                      width: 360upx;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      -o-text-overflow: ellipsis;
                      text {
                        color: #fe3a3b;
                      }
                    }
                  }

                  .ling2 {
                    .i3 {
                      border: 1px solid #e3e3e3;
                      font-size: 20upx;
                      color: #898989;
                      padding: 5upx 20upx;
                      border-radius: 30upx;
                      transform: scale(0.8);
                    }
                  }
                }
                .tc_left_box1 {
                  width: 410upx;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  -o-text-overflow: ellipsis;
                }
                text {
                  font-size: 20upx;
                  color: #767676;
                  margin-left: 8upx;
                }
              }
              .tc_right {
                image {
                  width: 50upx;
                  height: 50upx;
                }
              }
              &:last-child {
                padding-bottom: 30upx;
              }
            }
          }
        }
      }
      .tc_box2 {
        background-color: #818181;
        transition: all 0.1s;
      }
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
