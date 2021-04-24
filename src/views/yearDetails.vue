<template>
  <div class="year-details">
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
        <van-icon name="calendar-o" size="18" @click="showPopup" />
      </template>
    </van-nav-bar>
    <van-popup v-model="show" position="top" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        title="选择年份"
        :columns="columns"
        visible-item-count="5"
        :default-index="currentIndex"
        @confirm="handleChangeYear"
        @cancel="show = false"
      />
    </van-popup>
    <div class="total">
      <van-row>
        <van-col span="24"
          ><h2 class="title">{{ currentYear }}年</h2></van-col
        >
        <van-col span="24"
          ><span class="text"
            >共 <b>{{ Total.payNum }}</b> 笔支出，<b
              >￥{{ Total.payTotal }}</b
            ></span
          ></van-col
        >
        <van-col span="24"
          ><span class="text"
            >共 <b>{{ Total.inNum }}</b> 笔收入，<b
              >￥{{ Total.inTotal }}</b
            ></span
          ></van-col
        >
      </van-row>
    </div>
    <div class="charts">
      <van-row>
        <van-col span="4" offset="8"
          ><van-button
            :plain="type == 0 ? false : true"
            type="primary"
            size="mini"
            @click="handleChangeType"
            >支出</van-button
          ></van-col
        >
        <van-col span="4" offset="0"
          ><van-button
            :plain="type == 1 ? false : true"
            type="primary"
            size="mini"
            @click="handleChangeType"
            >收入</van-button
          ></van-col
        >
        <van-col span="6" offset="2"
          ><van-button
            type="default"
            plain
            icon="exchange"
            size="mini"
            to="monthDetails"
            >查看月账单</van-button
          ></van-col
        >
      </van-row>
      <div class="bar">
        <my-line
          :barData="
            type == 0 ? JSON.stringify(payBarData) : JSON.stringify(inBarData)
          "
        />
      </div>
      <div class="pie">
        <pie :pieData="type == 0 ? payPieData : inPieData" />
      </div>
    </div>
    <div class="recards">
      <record
        v-for="(item, index) in recordsList"
        :key="index"
        :item="item"
        @update-view="initData"
      />
    </div>
  </div>
</template>

<script>
const columns = [2020, 2021, 2022, 2023, 2024, 2025];
import MyLine from "@/components/line.vue";
import Pie from "@/components/pie.vue";
import Record from "@/components/record.vue";
import { getItem } from "@/utils/stroage.ts";
import { getFormat, isMonth, getDays, isYear } from "@/utils/time";
import { payCategory, inCategory } from "@/utils/Category.json";
export default {
  name: "yearDetails",
  components: { MyLine, Pie, Record },
  props: {},
  data() {
    return {
      show: false,
      noteList: [],
      recordsList: [],
      inList: [],
      payList: [],
      Total: {
        payTotal: 0,
        payNum: 0,
        inTotal: 0,
        inNum: 0,
        budget: 0,
      },
      type: 0,
      // 时间选择
      columns,
      currentYear: new Date().getFullYear(),
      currentIndex: columns.indexOf(new Date().getFullYear()),
      // 柱状图
      inBarData: {
        xData: [],
        yData: [],
      },
      payBarData: {
        xData: [],
        yData: [],
      },
      // 饼状图
      inPieData: inCategory,
      payPieData: payCategory,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.inPieData = inCategory;
      this.payPieData = payCategory;
      this.Total = {
        ...{ payTotal: 0, payNum: 0, inTotal: 0, inNum: 0, budget: 0 },
      };
      this.noteList = [...getItem("noteList")];
      // 年度账单数据
      this.payList = this.noteList.filter((item, index) => {
        if (
          item.type == 0 &&
          isYear(item.time, new Date(this.currentYear, 0, 1))
        ) {
          this.Total.payNum += 1;
          this.Total.payTotal += parseFloat(item.amount);
          return item;
        }
      });
      this.inList = this.noteList.filter((item, index) => {
        if (
          item.type == 1 &&
          isYear(item.time, new Date(this.currentYear, 0, 1))
        ) {
          this.Total.inNum += 1;
          this.Total.inTotal += parseFloat(item.amount);
          return item;
        }
      });
      this.recordsList = [...this.payList];
      // 柱状图数据
      this.payBarData.xData = Array.from(Array(12), (item, index) => index + 1);
      this.payBarData.yData = new Array(12).fill(0);
      this.inBarData.xData = Array.from(Array(12), (item, index) => index + 1);
      this.inBarData.yData = new Array(12).fill(0);
      this.payList.forEach((item, index) => {
        let month = getFormat(item.time, "YYYY年MM月DD日 HH:mm").$M;
        this.payBarData.yData[month] += parseFloat(item.amount);
        this.payPieData[item.category].value += parseFloat(item.amount);
      });
      this.inList.forEach((item, index) => {
        let month = getFormat(item.time, "YYYY年MM月DD日 HH:mm").$M;
        this.inBarData.yData[month] += parseFloat(item.amount);
        this.inPieData[item.category].value += parseFloat(item.amount);
      });
      // 饼状图数据
      this.payPieData = [
        ...this.payPieData.filter((item) => {
          if (item.value) {
            return item;
          }
        }),
      ];
      this.inPieData = [
        ...this.inPieData.filter((item) => {
          if (item.value) {
            return item;
          }
        }),
      ];
    },
    onClickLeft() {
      this.$router.push({ path: "/" });
    },
    showPopup() {
      this.show = true;
    },
    handleChangeType() {
      this.type = !this.type;
      if (this.type) {
        this.recordsList = this.inList;
      } else {
        this.recordsList = this.payList;
      }
    },
    handleChangeYear(value, index) {
      this.currentYear = value;
      this.currentIndex = index;
      this.show = false;
      this.initData();
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
.year-details {
  min-height: 100vh;
  background-color: #eee;
  .total {
    margin: 5px 16px;
    background-color: #fff;
    padding: 5px 16px;
    .title {
      font-size: 16px;
      margin: 5px 0;
    }
    .text {
      font-size: 14px;
    }
  }
  .charts {
    .van-col {
    }
    /deep/.van-col--4 {
      text-align: center;
      .van-button--primary {
        padding: 0 15px;
        background-color: seagreen;
        border: 0;
      }
      .van-button--plain {
        background-color: rgba(101, 205, 170, 0.5);
        color: seagreen;
      }
    }
    /deep/.van-col--6 {
      .van-button--default {
        color: seagreen;
        font-weight: bold;
        border: 0;
        background-color: rgba(0, 0, 0, 0);
        .van-button__icon {
          color: seagreen;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
