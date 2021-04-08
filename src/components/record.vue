<template>
  <div class="record-container">
    <van-swipe-cell class="cord-cell">
      <div>
        <van-row class="cord-row">
          <van-col span="3">
            <van-icon
              class-prefix="icon"
              :color="item.type ? '#41b883' : 'indianred'"
              :name="
                item.type
                  ? inCategory[item.category].icon
                  : payCategory[item.category].icon
              "
            ></van-icon>
          </van-col>
          <van-col span="5" offset=""
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
        <van-button square type="danger" text="删除" />
        <van-button square type="primary" text="编辑" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { inCategory, payCategory } from "@/utils/Category.json";
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
      .icon {
        line-height: 45px;
        width: 100%;
        // text-align: center;
        font-size: 30px;
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
