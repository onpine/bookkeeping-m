<template>
  <div class="bill-details">
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
      <van-datetime-picker
        visible-item-count="5"
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="handleChangeTime"
        @cancel="show = false"
      />
    </van-popup>
    <div class="total">
      <van-row>
        <van-col span="24"
          ><h2 class="title">{{ year }}年{{ month }}月</h2></van-col
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
          ><van-button type="default" plain icon="exchange" size="mini"
            >查看年账单</van-button
          ></van-col
        >
      </van-row>
      <div class="bar">
        <bar
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
      <record v-for="(item, index) in recordsList" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import Bar from "@/components/bar.vue";
import Pie from "@/components/pie.vue";
import Record from "@/components/record.vue";
import { getItem } from "@/utils/stroage.ts";
import { getFormat, isMonth, getDays } from "@/utils/time";
import { payCategory, inCategory } from "@/utils/Category.json";
export default {
  name: "billDetails",
  components: { Bar, Pie, Record },
  props: {},
  data() {
    return {
      show: false,
      year: undefined,
      month: undefined,
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
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
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
    this.initDate();
    console.log(this.payPieData);
  },
  methods: {
    initDate() {
      this.year = this.currentDate.getFullYear();
      this.month = this.currentDate.getMonth() + 1;
      this.Total = {
        ...{ payTotal: 0, payNum: 0, inTotal: 0, inNum: 0, budget: 0 },
      };
      this.noteList = [...getItem("noteList")];
      this.payList = this.noteList.filter((item, index) => {
        if (item.type == 0 && isMonth(item.time, this.currentDate)) {
          this.Total.payNum += 1;
          this.Total.payTotal += parseFloat(item.amount);
          return item;
        }
      });
      this.inList = this.noteList.filter((item, index) => {
        if (item.type == 1 && isMonth(item.time, this.currentDate)) {
          this.Total.inNum += 1;
          this.Total.inTotal += parseFloat(item.amount);
          return item;
        }
      });
      this.recordsList = [...this.payList];
      // 柱状图数据
      let days = getDays(this.year, this.month, 0);
      this.payBarData.xData = Array.from(
        Array(days),
        (item, index) => index + 1
      );
      this.payBarData.yData = new Array(days).fill(0);
      this.inBarData.xData = Array.from(
        Array(days),
        (item, index) => index + 1
      );
      this.inBarData.yData = new Array(days).fill(0);
      this.payList.forEach((item, index) => {
        let day = getFormat(item.time, "YYYY年MM月DD日 HH:mm").$D;
        this.payBarData.yData[day - 1] += parseFloat(item.amount);
        this.payPieData[item.category].value += parseFloat(item.amount);
      });
      this.inList.forEach((item, index) => {
        let day = getFormat(item.time, "YYYY年MM月DD日 HH:mm").$D;
        this.inBarData.yData[day - 1] += parseFloat(item.amount);
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
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
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
    handleChangeTime(value) {
      this.currentDate = value;
      this.show = false;
      this.initDate();
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
.bill-details {
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
