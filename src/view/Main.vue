<template>
  <div>
    <el-container>
      <CommonAside id="aside"></CommonAside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>
          <!-- 这里是主面板，当点击不同侧边栏的时候这里根据路由规则进行改变 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from '../components/CommonHeader.vue'
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    CommonAside,
    CommonHeader
  },
};
</script>

<style lang="less" scoped>

.el-header {
  background-color: rgb(51, 51, 51);

  text-align: center;
  line-height: 60px;
}

#aside {
  text-align: center;
  line-height: 100%;

}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>