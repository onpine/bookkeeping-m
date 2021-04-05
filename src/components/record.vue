<template>
  <div class="record-container">
    <van-swipe-cell class="cord-cell">
      <van-row class="cord-row">
        <van-col span="3"><van-icon name="phone-circle" /></van-col>
        <van-col span="5" offset=""
          ><span class="type-name">餐饮</span></van-col
        >
        <van-col span="8" offset="8"
          ><div class="num-wrap">
            <strong>￥6.00</strong><span>04月01日</span>
          </div></van-col
        >
      </van-row>
      <template #right>
        <van-button square type="danger" text="删除" />
        <van-button square type="primary" text="编辑" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "recordContainer",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='less'>
.record-container {
  .cord-cell {
    margin: 5px 16px;
    height: 65px;
    /deep/.van-button {
      height: 65px;
      border: 0;
    }
  }
  .cord-row {
    padding: 0 10px;
    background-color: #fff;
    border-radius: 32px 0 0 32px;
    // border-right: 2px solid #ccc;
    /deep/.van-col {
      height: 65px;
      padding: 10px 0;
      .van-icon {
        line-height: 45px;
        width: 100%;
        // text-align: center;
        font-size: 35px;
        color: indianred;
      }
      .type-name {
        display: block;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        font-weight: bold;
      }
      .num-wrap {
        height: 100%;
        text-align: right;
        strong {
          display: block;
          line-height: 25px;
          font-size: 16px;
          width: 100%;
        }
        span {
          display: block;
          width: 100%;
          line-height: 20px;
          font-size: 12px;
          color: #bbb;
        }
      }
    }
  }
}
</style>
