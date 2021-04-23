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
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    pieData(newValue, oldValue) {
      // console.log(newValue);
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
          trigger: "item",
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: this.pieData,
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
