<template>
  <view style="padding: 0 30upx">
    <view class="top_title">
      <view class="top_left">
        <uni-icons @click="tabBtn" type="arrowthinleft" size="20"></uni-icons>
        <text>歌单</text>
      </view>
      <view class="top_right">
        <view>
          <uni-icons type="search" size="20"></uni-icons>
        </view>
        <view class="i">
          <uni-icons type="more-filled" size="20"></uni-icons>
        </view>
      </view>
    </view>

    <view class="top_img">
      <view class="img">
        <image :src="playlist.coverImgUrl" />
      </view>

      <view class="info">
        <view class="title">
          {{ playlist.name }}
        </view>

        <view class="name">
          <view class="img">
            <image :src="playlist.creator.avatarUrl" />
          </view>
          <view>{{ playlist.creator.nickname }}</view>
          <view class="icon">
            <uni-icons type="plusempty" size="10" color="#fff"></uni-icons>
          </view>
        </view>

        <view class="font">
          <view class="text">
            {{ playlist.description }}
          </view>
          <view class="icon">
            <uni-icons type="arrowright" size="14"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <view class="number">
      <view>
        <view>
          <uni-icons type="shop" size="20"></uni-icons>
        </view>
        <view v-if="playlist.subscribedCount>=10000">
          {{ Math.floor(playlist.subscribedCount/10000) }}万
        </view>
        <view v-else>{{ playlist.subscribedCount }}</view>
      </view>
      <view class="solid">|</view>
      <view>
        <view>
          <uni-icons type="chat" size="20"></uni-icons>
        </view>
        <view>{{ playlist.commentCount }}</view>
      </view>
      <view class="solid">|</view>
      <view>
        <view>
          <uni-icons type="paperplane" size="20"></uni-icons>
        </view>
        <view>{{ playlist.shareCount }}</view>
      </view>
    </view>

    <view class="play">
      <view class="left">
        <view class="img" @click="playAll">
          <image src="../../static/image/bf.png" />
        </view>
        <view class="text">播放全部</view>
        <view class="num">( {{ playlist.trackCount }} )</view>
      </view>
      <view class="right">
        <view>
          <uni-icons type="download" size="20"></uni-icons>
        </view>
        <view>
          <uni-icons type="checkbox" size="20"></uni-icons>
        </view>
      </view>
    </view>

    <!-- @click="btn(item.songs[0].al.id)" -->
    <view class="box">
      <view
        class="list"
        v-for="(item, index) in songlist"
        :key="index"
        @click="btn(index)"
      >
        <view class="left">
          <view class="num">{{ index + 1 }}</view>
          <view class="info">
            <view class="title">{{ item.songs[0].al.name }}</view>
            <view class="title1">
              <view class="img">SQ</view>
              <view class="text" v-if="item.songs[0].alia[0]"
                >{{ item.songs[0].ar[0].name }} -
                {{ item.songs[0].alia[0] }}</view
              >
              <view class="text" v-else>{{ item.songs[0].ar[0].name }}</view>
            </view>
          </view>
        </view>

        <view class="right">
          <view class="img">
            <image src="../../static/image/bf2.png" />
          </view>
          <view class="i">
            <uni-icons type="more-filled" size="20"></uni-icons>
          </view>
        </view>
      </view>
      <view class="list2">
        <view class="img">
          <image src="../../static/image/r.jpg" />
          <image src="../../static/image/r.jpg" />
          <image src="../../static/image/r.jpg" />
          <image src="../../static/image/r.jpg" />
        </view>
        <view class="font">
          <view class="text">46506人收藏</view>
          <view class="i">
            <uni-icons type="forward" size="20"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <view class="footer" @click="detailsBtn">
      <view class="left">
        <view class="img">
          <image :src="url" />
        </view>
        <view class="title">{{name}} - <text>{{author}}</text></view>
      </view>
      <view class="right">
        <view class="play" @click.stop="playBan">
          <image v-if="playIcon" src="../../static/image/bf_h2.png" />
          <image v-else src="../../static/image/bf_h1.png" />
        </view>
        <view class="more">
          <uni-icons type="list" size="25"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Title from "../../components/topTitle/title.vue";
import { get } from "../../request.js";
export default {
  data() {
    return {
      playIcon:false,
      playlist: {
        creator: { avatarUrl: require("../../static/image/r.jpg") },
      },
      trackIds: [],
      songlist: [],
      url: require("../../static/image/r.jpg"),
      name:"选择播放音乐",
      author:""
    };
  },
  components: {
    Title,
  },
  methods: {
    bfHandle(url){//播放处理事件
      this.$store.state.creatA.src = url; //播放地址
      this.$store.state.creatA.autoplay = true;//自动播放
      this.$store.state.creatA.onPlay(res => {
        console.log("开始播放");
        this.playIcon = true;
      })
      this.$store.state.creatA.onEnded(res => {
        console.log("播放结束")
        this.playIcon = false;
        //播放下一首
        this.$store.state.index +=1;//下一首
        this.playAll()
      })
    },
    btn(id) {
      console.log(id)
      // console.log(this.$store.state.songlistIds)
      // let _this = this;
      this.$store.state.index = id
      uni.navigateTo({
        url: "/pages/details/details",
      });
    },
    tabBtn() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    detailsBtn(){
      uni.navigateTo({
        url:"/pages/details/details"
      })
    },
    playBan(){//播放暂停
      this.playIcon = !this.playIcon;
      if(this.playIcon){
        this.$store.state.play() //播放
      }else{
        this.$store.state.pause() //暂停
      }
    },
    playAll(){//播放全部
      // console.log("播放全部")
      let songlistIds = this.$store.state.trackIds;
      let index = this.$store.state.index;
			get('/check/music', { id: songlistIds[index].id }).then((res) => {//歌曲是否有权
				if (res[1].data.success) {
          get('/song/detail', { ids: songlistIds[index].id }).then((res) => {//获取歌曲详情
            console.log(res[1].data, '歌曲详情');
            this.url = res[1].data.songs[0].al.picUrl;//歌曲图片
            this.name = res[1].data.songs[0].al.name;//歌曲名称
            this.author = res[1].data.songs[0].ar[0].name;//作者
						// this.songs_xq = res[1].data.songs;
						// this.endDate = formatTime(Math.floor(this.songs_xq[0].dt / 1000));
          });
          
					get('/song/url', { id: songlistIds[index].id }).then((res) => {//获取音乐url
            let url = res[1].data.data[0].url;
            console.log("监听当前序号:"+this.$store.state.index)
						this.bfHandle(url);
					});
				} else {
					console.log('暂无版权');
					this.$store.state.index +=1;//下一首
          this.playAll()
				}
			});
    }
    
  },
  onLoad() {
    // console.log("onLoad");
    this.playlist = this.$store.state.playlistDat;//歌单详情
    this.trackIds = this.$store.state.trackIds;//换取音乐的id

    for (let i = 0; i < this.trackIds.length; i++) {
      //所有歌曲列表信息和id  songlist
      get("/song/detail", { ids:this.trackIds[i].id }).then((res) => {
        this.songlist.push(res[1].data);
        this.$store.state.songlistIds.push(res[1].data.songs[0].al.id)
      });
    }
  },
};
</script>

<style lang="scss">
.top_title {
  display: flex;
  justify-content: space-between;
  font-size: 36upx;
  height: 100upx;
  line-height: 100upx;

  .top_left {
    display: flex;
    justify-content: space-between;
    width: 150upx;
  }

  .top_right {
    display: flex;
    justify-content: space-between;
    width: 130upx;
    .i {
      transform: rotate(90deg);
    }
  }
}

.top_img {
  display: flex;
  font-size: 34upx;
  justify-content: space-between;

  .img {
    width: 220upx;
    height: 220upx;
    border-radius: 25upx;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    width: 450upx;
    .title {
      width: 400upx;
      height: 90upx;
      margin-bottom: 35upx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .name {
      display: flex;
      font-size: 26upx;

      .img {
        width: 50upx;
        height: 50upx;
        border-radius: 50%;
        margin-right: 20upx;
        margin-top: -10upx;
      }

      .icon {
        background-color: #c3c3c3;
        padding: 0upx 20upx;
        border-radius: 30upx;
        margin-left: 5upx;
      }
    }
    .font {
      display: flex;

      .text {
        font-size: 20upx;
        margin-top: 20upx;
        width: 450upx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }

      .icon {
        margin-top: 12upx;
        margin-left: 15upx;
      }
    }
  }
}

.number {
  display: flex;
  //border: 1px solid #d8d8d8;
  width: 560upx;
  height: 70upx;
  line-height: 70upx;
  font-size: 32upx;
  margin: 0 auto;
  padding: 0 30upx;
  border-radius: 50upx;
  margin-top: 50upx;
  box-shadow: 0 4upx 20upx  #d8d8d8;

  view {
    display: flex;

    view {
      margin-left: 20upx;
      line-height: 70upx;
    }
  }

  .solid {
    margin: 0 20upx;
    margin-left: 35upx;
    font-size: 46upx;
    line-height: 70upx;
    margin-top: -5upx;
    color: #dadada;
    font-weight: 100;
  }
}

.play {
  display: flex;
  justify-content: space-between;
  font-size: 34upx;
  font-weight: bold;
  height: 130upx;
  line-height: 130upx;

  .left {
    display: flex;

    .img {
      width: 40upx;
      height: 40upx;
      line-height: 40upx;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 30upx;
      margin-top: 45upx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      margin-right: 20upx;
    }

    .num {
      font-size: 30upx;
      font-weight: 500;
      color: #898989;
    }
  }

  .right {
    display: flex;
    view {
      margin-right: 40upx;
      font-weight: 500;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.box {
  height: 750upx;
  overflow: auto;
  .list2 {
    margin-bottom: 130upx;
    display: flex;
    justify-content: space-between;
    .img {
      // border:1px solid red;
      image {
        width: 60upx;
        height: 60upx;
        border-radius: 50%;
        margin-right: 30upx;
      }
    }
    .font {
      font-size: 32upx;
      display: flex;
      justify-content: space-between;
      width: 250upx;
      line-height: 60upx;
    }
  }
}

.list {
  display: flex;
  justify-content: space-between;
  font-size: 38upx;
  margin-bottom: 30upx;

  .left {
    display: flex;
    .num {
      width: 60upx;
      font-size: 32upx;
      line-height: 100upx;
      color: #686868;
    }
    .info {
      font-size: 34upx;
      .title {
        width: 450upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      .title1 {
        display: flex;
        font-size: 20upx;
        color: #686868;
        transform: scale(0.9);
        .img {
          border: 1px solid red;
          border-radius: 10upx;
          padding: 0 8upx;
          color: red;
          font-weight: bold;
          transform: scale(0.6);
          margin-left: -35upx;
        }
        .text {
          width: 450upx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }
      }
    }
  }

  .right {
    display: flex;
    line-height: 100upx;

    .img {
      width: 60upx;
      height: 55upx;
      margin-right: 20upx;
      margin-top: 6upx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .i {
      transform: rotate(90deg);
      margin-top: -10upx;
    }
  }
}

.footer {
  font-size: 32upx;
  position: fixed;
  height: 100upx;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 30upx;
  box-sizing: border-box;
  border-top:1upx solid #f0f0f0;

  .left {
    display: flex;
    .img {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      overflow: hidden;
      margin-top: -10upx;
      margin-right: 20upx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      line-height: 85upx;
      width:400upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
      -o-text-overflow: ellipsis;
      text {
        font-size: 30upx;
        transform: scale(0.8);
        color: #585858;
        display: inline-block;
      }
    }
  }

  .right {
    display: flex;
    //line-height: 90upx;
    .play {
      width: 50upx;
      height: 50upx;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 15upx;
      margin-right: 50upx;
      border:1px solid #c6c6c6;
      padding-left: 2upx;

      image {
        width: 25upx;
        height: 25upx;
        margin:0 auto;
        margin-top:15upx;
      }
    }
    .more{
      margin-top:15upx;
    }
  }
}
</style>