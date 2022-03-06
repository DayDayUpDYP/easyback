<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
            <div class="login-info">
              <p>上次登录时间:<span>2021-7-19</span></p>
              <p>上次登录地点:<span>重庆</span></p>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              :prop="index"
              v-for="(val, index) in tableLabel"
              :key="index"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col style="margin-top: 20px" :span="16">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>

        <!-- 三个卡片 -->
        <el-card style="height: 280px">
          <!-- <div style="height: 280px" ref="echarts"></div> -->
          <Echarts :chartData="echartData.order" style="height:280px"></Echarts>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <!-- <div style="height: 240px" ref="userGraph"></div> -->
            <Echarts :chartData="echartData.user" style="height:240px"></Echarts>
          </el-card>
          <el-card style="height: 260px">
            <!-- <div style="height: 240px" ref="videoGraph"></div> -->
            <Echarts :chartData="echartData.video" :isAxisChart="false" style="height:240px"></Echarts>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../../../api/data.js";
// import * as echarts from "echarts";
import Echarts from "../../../src/components/Echarts.vue";
export default {
  name: "Home",
  // 组件引入   引入后 需要改写原来的
  components: {
    Echarts,
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [],

      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],

      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      // 第一步 定义 新的echarts的三个属性
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code == 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;

        // 构建折线图
        const keyArray = Object.keys(
          order.data[0] //每一个对象的属性都是一样的 所以选择第一个的就行
        ); /*order.data[0]表示得到data数组中的第一个  */
        const series = [];
        /* 写法 记忆  这部分需要重点 */
        keyArray.forEach((key) => {
          // key来自与keyArray  这部分主要使用forEach里面的函数进行为series赋值
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        /* 这部分 可以被优化掉   */
        // const option = {
        //   xAxis: {
        //     data: order.date,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        // };

        this.echartData.order.xData = order.date
        this.echartData.order.series = series

        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);

        // 用户图   柱状图
        // const userOption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "10%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: data.userData.map((item) => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   // series: [
        //   //   {
        //   //     name: "新增用户",
        //   //     data: data.userData.map((item) => item.new),
        //   //     type: "bar",
        //   //   },
        //   //   {
        //   //     name: "活跃用户",
        //   //     data: data.userData.map((item) => item.active),
        //   //     type: "bar",
        //   //   },
        //   // ],
        // };
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ]
        // const u = echarts.init(this.$refs.userGraph);
        // u.setOption(userOption);

        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: "pie",
        //     },
        //   ],
        // };
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: "pie",
            }
          ]
        // const v = echarts.init(this.$refs.videoGraph);
        // v.setOption(videoOption);
      }
      console.log(res);
    });
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>