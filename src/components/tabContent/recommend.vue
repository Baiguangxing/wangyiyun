<template>
  <view style="padding: 30upx">
    <view class="box">
      <Title
        class="row"
        title="用户_520154057843578435784357843"
        :list="data"
      ></Title>
      <Title2 class="row" title="每日新鲜推荐" :list="data"></Title2>
      <Title3
        class="row"
        title="排行榜"
        :hy="hy"
        :gf="gf"
        :om="om"
        :lx="lx"
      ></Title3>
      <Title2 class="row" title="必听的官方歌单" :list="data"></Title2>
      <Title4 class="row" title="这些歌单正合你意" :list="data2"></Title4>
      <view class="bottom"> 暂无更多歌单 </view>
    </view>
  </view>
</template>

<script>
import Title from "../list/title.vue";
import Title2 from "../list/title2.vue";
import Title3 from "../list/title3.vue";
import Title4 from "../list/title4.vue";
import { get } from "../../request.js";
export default {
  data() {
    return {
      arr: [],
      date: 0,
    };
  },
  props: {
    data: Array,
    data2: Array,
    hy: Array,
    gf: Array,
    om: Array,
    lx: Array,
  },
  components: {
    Title,
    Title2,
    Title3,
    Title4,
  },
  created() {},
  computed: {},
  methods: {
    formatTime(second) {
      var sec = second % 60;
      var min = Math.floor(second / 60);
      if (min.toString().length < 2) {
        min = "0" + min;
      }
      if (sec.toString().length < 2) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  margin-top: -20upx;
}

.row {
  margin-top: 50upx;
  &:first-child {
    margin-top: 0;
  }
}

.bottom {
  margin-top: 30upx;
  height: 400upx;
  text-align: center;
  font-size: 30upx;
  color: #505050;
}

</style>
