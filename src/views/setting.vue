<template>
  <div class="setting-container">
    <van-nav-bar
      class="nav-wrap"
      title="设置"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group class="cell-wrap">
      <van-cell title="备份数据">
        <template #label>
          <span>备份账单数据</span>
        </template>
      </van-cell>
      <van-cell title="导出CSV">
        <template #label>
          <span>将账单数据导出到CSV</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="cell-wrap">
      <van-cell title="备份数据">
        <template #label>
          <span>备份账单数据</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "settingContainer",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__title {
  font-weight: 600;
}
/deep/.van-nav-bar .van-icon {
  font-weight: 600;
  color: #41b883;
}
.setting-container {
  background-color: #eee;
  height: 100vh;
  .nav-wrap {
    margin-bottom: 10px;
  }
  .cell-wrap {
    margin: 10px 0;
  }
}
</style>
