<template>
  <div class="home-container">
    <van-nav-bar title="我的记账本" border>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-cell>
        <span slot="title" class="this-title">本月支出</span>
      </van-cell>
      <van-cell>
        <span slot="title" class="this-value">暂无支出</span>
        <van-icon slot="right-icon" name="eye" class="eye" />
      </van-cell>
      <van-cell>
        <div slot="title">
          <span class="this-title">本月收入</span>
          <span class="this-value2">暂无</span>
        </div>
        <div slot="default" class="left-value">
          <span class="this-title">预算剩余</span>
          <span class="this-value2">未设置预算</span>
        </div>
      </van-cell>
      <van-cell>
        <van-button icon="chart-trending-o" type="default" to="index" block
          >查看图标分析</van-button
        >
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell>
        <div slot="title">
          <span class="this-title">今日支出</span>
          <span class="this-value2">暂无</span>
        </div>
        <div slot="default" class="left-value">
          <span class="this-title">今日收入</span>
          <span class="this-value2">暂无</span>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="today">
      <record />
    </div>
    <div class="write-btn">
      <van-button to="/note" round type="primary" icon="edit"
        >记一笔...</van-button
      >
    </div>
    <div class="info-btn">
      <van-button
        @click="show = !show"
        round
        type="primary"
        icon="points"
      ></van-button>
    </div>
    <van-action-sheet v-model="show" title="标题">
      <div class="sheet">
        <van-grid clickable :column-num="3">
          <van-grid-item icon="info-o" text="关于" to="/about" />
          <van-grid-item icon="setting-o" text="设置" to="/setting" />
          <van-grid-item icon="bars" text="账单记录" to="/records" />
          <van-grid-item icon="chart-trending-o" text="账单详情" to="/" />
        </van-grid>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import Record from "@/components/record.vue";
export default {
  name: "homeContainer",
  components: { Record },
  props: {},
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='less'>
.home-container {
  background-color: #eee;
  height: 100vh;

  .this-title {
    font-size: 13px;
    color: #aaa;
    flex: 1;
  }
  .this-value {
    font-size: 24px;
    font-weight: 600;
    margin: 10px auto;
    line-height: 30px;
  }
  .this-value2 {
    font-size: 14px;
    padding: 0px 10px;
    color: #323233;
    flex: 1;
    font-weight: 600;
  }
  .eye {
    font-size: 20px;
    line-height: 30px;
  }
  .left-value {
    text-align: left;
  }
  .write-btn {
    position: fixed;
    bottom: 20px;
    text-align: center;
    width: 100%;
  }
  .info-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  .today {
  }
}
/deep/.van-cell-group {
  margin: 16px;
}
/deep/.van-nav-bar__title {
  margin-left: 16px;
  font-weight: 600;
}
/deep/.van-nav-bar .van-icon {
  font-weight: 600;
  font-size: 16px;
  color: #41b883;
}
/deep/.van-button__icon {
  font-size: 16px;
  font-weight: 600;
}
/deep/.van-icon-shop-o {
  display: block;
  font-size: 20px;
  font-weight: 600;
  // background-color: indianred;
  color: indianred;
}
/deep/.van-button--round {
  box-shadow: #777777 2px 3px 3px 0px;
}
/deep/.van-button--default {
  border: none;
  color: #41b883;
  font-weight: 600;
}
/deep/.van-button--primary {
  border: none;
  padding: auto 20px;
  font-weight: 600;
}
.sheet {
  padding: 20px;
  height: 150px;
}
</style>
