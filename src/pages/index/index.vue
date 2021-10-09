<template>
  <view class="main">
    <!-- 头部导航栏 -->
    <view class="top_title">
      <view class="toptabTitle">歌单广场</view>
    </view>

    <!-- 导航切换样式 -->
    <view class="tab_row">
      <scroll-view scroll-x>
        <topTab
          :tabBars="tabBars"
          :tabIndex="tabIndex"
          @tabtap="tabtap"
        ></topTab>
      </scroll-view>
      <view class="screen">
        <image src="../../static/image/sx.png"/>
      </view>
    </view>

    <!-- 切换导航相应的内容 -->
    <view class="uni-tab-bar">
      <swiper
        class="swiper-box"
        :style="{ height: swiperheight + 'px' }"
        :current="tabIndex"
        @change="tabChange"
      >
        <swiper-item v-for="(items, index) in newslist" :key="index">
          <scroll-view scroll-y class="list">
            <template v-if="items.list.length > 0">
              <!-- 图文列表 -->
              <block v-for="(item, index1) in items.list" :key="index1">
                <view v-if="item == '1'">
                  <Recommend :data="data1" :data2="data2" :hy="hy_data" :gf="gf_data" :om="om_data" :lx="lx_data"></Recommend>
                </view>
                <view v-else>
                  <Authority :data="data3"></Authority>
                </view>
              </block>
            </template>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
/***************文件引入**************/
import { get } from "../../request.js";
import topTab from "../../components/topTab/index.vue";
import Recommend from "../../components/tabContent/recommend.vue";
import Authority from "../../components/tabContent/authority.vue";
// import { uniRow,uniCol } from '@dcloudio/uni-ui';

/***************普通函数**************/
function test(params) {}

export default {
  /***************数据存放**************/
  data() {
    return {
      imgSrc: "a",
      tabIndex: 0, // 选中的
      data1: [],
      data2: [],
      data3:[],
      hy_data:[],
      gf_data:[],
      om_data:[],
      lx_data:[],
      tabBars: [
        { name: "推荐", id: "tuijian" },
        { name: "官方", id: "guangfang" },
        { name: "精品", id: "jingping" },
        { name: "华语", id: "huayu" },
        { name: "电子", id: "dianzi" },
        { name: "轻音乐", id: "qingyinyue" },
        { name: "摇滚", id: "yaogun" },
        { name: "民谣", id: "minyao" },
      ],
      swiperheight: 500, //高度
      newslist: [
        { list: ["1"] },
        { list: ["官方"] },
        { list: ["精品"] },
        { list: ["华语"] },
        { list: ["电子"] },
        { list: ["轻音乐"] },
        { list: ["摇滚"] },
        { list: ["民谣"] },
      ],
    };
  },

  /***************注册组件**************/
  components: {
    topTab,
    Recommend,
    Authority
  },

  /***************绑定的函数**************/
  methods: {
    //接受子组件传过来的值点击切换导航
    tabtap(index) {
      this.tabIndex = index;
    },
    //滑动切换导航
    tabChange(e) {
      this.tabIndex = e.detail.current;
      // console.log(e);
    },
  },

  /***************生命周期**************/
  onLoad() {
    
    uni.getSystemInfo({
      success: (res) => {
        let height = res.windowHeight - uni.upx2px(100);
        this.swiperheight = height;
      },
    });

    get("/personalized", {}).then((res) => {//推荐歌单列表
      // console.log(res[1].data.result);
      let data = res[1].data.result;
      let data1 = []; //前六条数据
      //0-5     0*6   1*6-1
      //6-11    1*6   2*6-1
      //12-17    2*6  3*6-1
      //18-23    3*6  4*6-1
      let sjNum = this.$store.state.sjNum;
      for (let i = 6*(sjNum-1); i < 6*sjNum; i++) {
        data1.push(data[i]);
      }
      this.data1 = data1;
      this.data2 = res[1].data.result;
    });

    get("/top/playlist/highquality", {}).then((res) => {
      //精品歌单列表
      // console.log(res[1].data.playlists);
      this.data3 = res[1].data.playlists;
    });

    get("/top/playlist", {cat:"华语",limit:3}).then((res) => {
      //华语歌单列表
      this.hy_data = res[1].data.playlists;
    });

    get("/top/playlist", {cat:"古风",limit:3}).then((res) => {
      //古风歌单列表
      this.gf_data = res[1].data.playlists;
    });

    get("/top/playlist", {cat:"欧美",limit:3}).then((res) => {
      //欧美歌单列表
      this.om_data = res[1].data.playlists;
    });

    get("/top/playlist", {cat:"流行",limit:3}).then((res) => {
      //流行歌单列表
      this.lx_data = res[1].data.playlists;
    });
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 1200upx;
}

.top_title {
  display: flex;
}

.toptabTitle {
  width: 100%;
  text-align: left;
  margin-left: 30upx;
  line-height: 50upx;
  font-size:32upx;
  font-weight: bold;
  margin-top:20upx;
}

.tab_row {
  position: relative;
  .screen {
    box-shadow: -10upx 0 15upx -15upx #5c5c5c;
    position: absolute;
    right: 0;
    top: 0;
    background-color: white;
    height: 80upx;
    width: 110upx;
    image {
      width: 35upx;
      height: 35upx;
      position: absolute;
      right: 30upx;
      top: 20upx;
    }
  }
}
</style>
