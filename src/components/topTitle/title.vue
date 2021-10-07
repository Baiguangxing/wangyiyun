<template>
  <view class="top">
      <view class="icon">
          <uni-icons type="arrowthinleft" size="30"></uni-icons>
      </view>
      <view class="title">
          <text>{{title}}</text>
      </view>
  </view>
</template>

<script>
export default {
    props:{
        title:String
    }
}
</script>

<style lang="scss">
    .top{
        display: flex;
    }
</style>