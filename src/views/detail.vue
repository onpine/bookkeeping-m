<template>
  <div class="detail-container">
    <van-nav-bar
      class="nav-wrap"
      title="账单详情"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
      <template #right>
        <van-icon name="delete-o" size="18" @click="handleDelete" />
      </template>
    </van-nav-bar>
    <div class="content">
      <van-cell-group>
        <van-cell title="分类">
          <template #icon>
            <!-- <van-icon name="shop-o" class="type-icon" /> -->
            <van-icon
              class-prefix="icon"
              :class="data.type ? 'type-icon1' : 'type-icon2'"
              color="#fff"
              :name="
                data.type
                  ? inCategory[data.category].icon
                  : payCategory[data.category].icon
              "
            ></van-icon>
          </template>
          <template #default>
            <span class="amount">{{ data.amount }} ￥</span>
          </template>
        </van-cell>
        <van-cell title="备注：" value="内容">
          <template #default>
            <span>{{ data.message == "" ? "- - -" : data.message }}</span>
          </template>
        </van-cell>
        <van-cell title="时间：" value="内容">
          <template #default>
            <span>{{ data.time }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="edit">
      <van-button plain>修改</van-button>
    </div>
  </div>
</template>

<script>
import { inCategory, payCategory } from "@/utils/Category.json";
import { getItem, setItem } from "@/utils/stroage.ts";
import { isMonth, isToday } from "@/utils/time";
export default {
  name: "detailContainer",
  components: {},
  props: {},
  data() {
    return {
      data: this.$route.params,
      inCategory,
      payCategory,
      noteList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.noteList = [...getItem("noteList")];
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/" });
    },
    handleDelete() {
      // 删除账目记录
      let newList = this.noteList.filter((item) => {
        if (item.stamp != this.data.stamp) {
          return item;
        }
      });
      setItem("noteList", newList);
      // 检查是否影响本月和今日
      if (isMonth(this.data.time)) {
        // 更新本月汇总
        let monthTotal = { ...getItem("monthTotal") };
        if (this.data.type) {
          monthTotal.inTotal -= parseFloat(this.data.amount);
        } else {
          monthTotal.payTotal -= parseFloat(this.data.amount);
        }
        setItem("monthTotal", monthTotal);
        // 检查是否影响今日
        if (isToday(this.data.time)) {
          let todayTotal = { ...getItem("todayTotal") };
          if (this.data.type) {
            todayTotal.inTotal -= parseFloat(this.data.amount);
          } else {
            todayTotal.payTotal -= parseFloat(this.data.amount);
          }
          setItem("todayTotal", todayTotal);
        }
      }
      this.$router.push("/");
    },
  },
  // 组件内路由前置守卫
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    let params = { ...to.params };
    if (JSON.stringify(params) != "{}") {
      next();
    } else {
      next({ name: "home" });
    }
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
.detail-container {
  height: 100vh;
  background-color: #eee;
  .content {
    margin: 10px;
    /deep/.van-cell {
      line-height: 30px;
    }
    /deep/.van-cell__value {
      .amount {
        font-weight: bold;
        color: #000;
      }
    }
    .type-icon1 {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      margin-right: 8px;
      width: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: #41b883;
      line-height: inherit;
    }
    .type-icon2 {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      margin-right: 8px;
      width: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: indianred;
      line-height: inherit;
    }
  }
  .edit {
    position: fixed;
    bottom: 0;
    width: 100%;
    /deep/.van-button {
      width: 100%;
      border: 0;
      box-shadow: 0 -2px 5px 0px #aaa;
      color: seagreen;
      font-weight: bold;
      background-color: #eee;
    }
  }
}
</style>
