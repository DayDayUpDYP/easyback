<template>
  <div ref="echarttt"></div>
</template>
<script>
/* 实现echarts组件封装 调用 */
import * as echarts from "echarts";

export default {
  props: {
    // 一下两个只由父亲传递
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [], //时间坐标
          series:[], //数值
        };
      },
    },
  },
  data() {
    return {
      // axiosOption 表示需要展示x y 轴的那种图
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },
  watch: {
    //  在数据发生改变的时候 echarts需要重新绘制
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,  //首次监听 也触发
    },
  },
  // 在方法下面定义echarts初始化方法
  methods: {
    initChart() {
      // 初始化
      this.initChartData()
      //渲染数据
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echarttt);
        this.echart.setOption(this.options);
      }
    },
    // 初始化 这个图的数据
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
        console.log('初始化的echartthis.chartData.series==>',this.chartData.series);
      } else {
        this.normalOption.series = this.chartData.series;
        console.log("初始化完毕后的==》",this.chartData.series);
      }
    },
  },
  computed: {
    
    options() {
      // 判断是哪种类型的图，如果是有x y 轴的就展示第一个
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
};
</script>

<style>
</style>