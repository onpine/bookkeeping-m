<template>
  <div class="pie-container" id="pie-main"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/chart/pie");
let myChart;
export default {
  name: "",
  components: {},
  props: {
    pieData: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      data: undefined,
    };
  },
  computed: {},
  watch: {
    pieData(newValue, oldValue) {
      // console.log(newValue);
      this.data = JSON.parse(newValue);
      this.draw();
    },
  },
  created() {},
  mounted() {
    var chartDom = document.getElementById("pie-main");
    myChart = echarts.init(chartDom);
  },
  methods: {
    draw() {
      var option;

      option = {
        title: {
          // text: "支出分类",
          // subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          triggerOn: "mousemove|click",
          trigger: "item",
          formatter: "{b}: ￥{c}<br />{d}%",
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
        series: [
          {
            name: "分类统计",
            type: "pie",
            radius: "50%",
            data: this.data,
            label: {
              formatter: "{b}:￥{c} ({d}%)",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
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
.pie-container {
  height: 240px;
  background-color: #fff;
  margin: 10px 16px;
}
</style>
