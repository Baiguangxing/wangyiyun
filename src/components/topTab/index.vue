<template>
  <view class="uni-tab-bar">
    <scroll-view class="uni-swiper-tab" scroll-x="true" show-scrollbar="false">
      <block v-for="(tab, index) in tabBars" :key="tab.id" :style="scrollStyle">
        <view
          class="swiper-tab-list"
          :class="{ active: tabIndex == index }"
          @tap="tabtap(index)"
          :style="scrollItemStyle"
        >
          {{ tab.name }} {{ tab.num ? tab.num : "" }}
          <view class="swiper-tab-line"></view>
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    tabBars: Array,
    tabIndex: Number,
    scrollStyle: {
      type: String,
      default: "",
    },
    scrollItemStyle: {
      type: String,
      default: "",
    },
  },
  methods: {
    //点击切换导航
    tabtap(index) {
      // this.tabIndex = index;
      this.$emit("tabtap", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.uni-swiper-tab {
  width: 1150upx;
  height: 80upx;
  line-height: 80upx;
}

.swiper-tab-list {
  float: left;
  color: #969696;
  font-weight: bold;
  font-size: 32upx;
  margin: auto;
  padding: 0 30upx;
  text-align: center;
}

.uni-tab-bar .active {
  color: #343434;
}

.active .swiper-tab-line {
	// border:1px solid red;
  border-bottom: 7upx solid #ff6161;
  width: 70upx;
  margin: auto;
  border-top: 10upx solid #ff6161;
  border-radius: 30%;
  margin-top: -36upx;
}
</style>
