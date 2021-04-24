<template>
  <div class="line-container" id="line-main"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/grid");
require("echarts/lib/chart/line");
require("echarts/lib/component/markPoint");
require("echarts/lib/component/markLine");
let myChart;
export default {
  name: "lineContainer",
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
    var chartDom = document.getElementById("line-main");
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
            name: "每月变化",
            type: "line",
            data: this.data.yData,
            markPoint: {
              data: [{ type: "max", name: "最大值" }],
              symbol: "pin",
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
              label: { position: "start" },
              lineStyle: {
                width: 1,
                type: "dotted",
              },
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
.line-container {
  height: 240px;
  background-color: #fff;
  margin: 10px 16px;
}
</style>
