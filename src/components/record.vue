<template>
  <div class="record-container">
    <van-swipe-cell class="cord-cell">
      <div>
        <van-row class="cord-row" @click="handleDetail">
          <van-col span="4">
            <div :class="item.type ? 'type-icon1' : 'type-icon2'">
              <van-icon
                class-prefix="icon"
                color="#fff"
                :name="
                  item.type
                    ? inCategory[item.category].icon
                    : payCategory[item.category].icon
                "
              ></van-icon>
            </div>
          </van-col>
          <van-col span="4" offset=""
            ><span class="type-name">{{
              item.type
                ? inCategory[item.category].name
                : payCategory[item.category].name
            }}</span></van-col
          >
          <van-col span="16" offset=""
            ><div class="num-wrap">
              <strong>{{ item.amount }}￥</strong><span>{{ item.time }}</span>
            </div></van-col
          >
        </van-row>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="handleDelete(item)"
        />
        <van-button square type="primary" text="编辑" @click="handleEdit" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { inCategory, payCategory } from "@/utils/Category.json";
import { getItem, setItem } from "@/utils/stroage.ts";
import { isMonth, isToday } from "@/utils/time";
export default {
  name: "recordContainer",
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {
      inCategory,
      payCategory,
      noteLists: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.noteLists = [...getItem("noteList")];
  },
  methods: {
    handleDetail() {
      this.$router.push({
        name: "detail",
        params: {
          ...this.item,
        },
      });
    },
    handleDelete(element) {
      // 删除账目记录
      let newList = this.noteLists.filter((item) => {
        if (item.stamp != element.stamp) {
          return item;
        }
      });
      setItem("noteList", newList);
      // 检查是否影响本月和今日
      if (isMonth(element.time)) {
        // 更新本月汇总
        let monthTotal = { ...getItem("monthTotal") };
        if (element.type) {
          monthTotal.inTotal -= parseFloat(element.amount);
        } else {
          monthTotal.payTotal -= parseFloat(element.amount);
        }
        setItem("monthTotal", monthTotal);
        // 检查是否影响今日
        if (isToday(element.time)) {
          let todayTotal = { ...getItem("todayTotal") };
          if (element.type) {
            todayTotal.inTotal -= parseFloat(element.amount);
          } else {
            todayTotal.payTotal -= parseFloat(element.amount);
          }
          setItem("todayTotal", todayTotal);
        }
        this.$emit("update-view");
      }
    },
    handleEdit() {
      this.$router.push({
        name: "edit",
        params: {
          ...this.item,
        },
      });
    },
  },
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
    /deep/.van-col--4 {
      .icon {
        line-height: 45px;
        font-size: 20px;
      }
      .type-icon1 {
        width: 45px;
        text-align: center;
        border-radius: 50%;
        background-color: #41b883;
      }
      .type-icon2 {
        width: 45px;
        text-align: center;
        border-radius: 50%;
        background-color: indianred;
      }
    }
    /deep/.van-col {
      height: 65px;
      padding: 10px 0;
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
