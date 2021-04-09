<template>
  <div class="records-container">
    <van-nav-bar
      class="nav-wrap"
      title="账单记录"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <div>
      <van-row class="cell-wrap">
        <van-col span="7"><span class="wrap-title">2021年4月</span></van-col>
        <van-col span="6" offset="11">
          <van-button
            class="wrap-btn"
            size="small"
            :hairline="false"
            style="background: #eee; border-color: 0"
            to="index"
            >查看月账单</van-button
          ></van-col
        >
      </van-row>
      <record v-for="(item, index) in noteList" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import { getItem } from "@/utils/stroage.ts";
import Record from "@/components/record.vue";
export default {
  name: "recordsContainer",
  components: { Record },
  props: {},
  data() {
    return {
      noteList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.noteList = [...getItem("noteList")];
    console.log(this.noteList);
  },
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
.records-container {
  background-color: #eee;
  min-height: 100vh;
  .nav-wrap {
    margin-bottom: 10px;
  }
  .cell-wrap {
    margin: 10px 0;
    background-color: #eee;
    height: 30px;
    /deep/.van-col {
      height: 30px;
      display: flex;
    }
  }
  .wrap-title {
    font-weight: bold;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    padding: 0 12px;
    flex: 1;
  }
  .wrap-btn {
    color: #41b883;
    font-weight: bold;
    line-height: 30px;
    border: 0;
    flex: 1;
  }
}
</style>
