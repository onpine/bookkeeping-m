<template>
  <div class="bar-container" id="bar-main"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/grid");
require("echarts/lib/chart/bar");
let myChart;
export default {
  name: "barContainer",
  components: {},
  props: {
    barData: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: undefined,
    };
  },
  computed: {},
  watch: {
    barData(newValue, oldValue) {
      // console.log(newValue);
      this.data = JSON.parse(newValue);
      this.draw();
    },
  },
  created() {},
  mounted() {
    var chartDom = document.getElementById("bar-main");
    myChart = echarts.init(chartDom);
  },
  methods: {
    draw() {
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.data.xData,
            splitNumber: 5,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            // axisLabel: {
            //   show: false,
            // },
            splitNumber: 5,
          },
        ],
        series: [
          {
            name: "每日金额",
            type: "bar",
            barWidth: "60%",
            data: this.data.yData,
            itemStyle: {
              borderRadius: [30, 30, 30, 30],
            },
            markPoint: {
              data: [{ type: "max", name: "最大值" }],
              symbol: "pin",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang='less'>
.bar-container {
  height: 240px;
  background-color: #fff;
  margin: 10px 16px;
}
</style>
