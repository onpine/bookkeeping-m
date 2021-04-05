<template>
  <div class="about-container">
    <van-nav-bar
      class="nav-wrap"
      title="关于"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group class="cell-wrap">
      <van-cell title="开发者">
        <template #label>
          <span>onpine</span>
        </template>
      </van-cell>
      <van-cell title="邮箱">
        <template #label>
          <span>718215627@qq.com</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "aboutContainer",
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
.about-container {
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
