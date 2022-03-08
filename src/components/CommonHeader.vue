<template>
  <header style="background-color: rgb(51, 51, 51)">
    <div class="l-content">
      <el-button
        @click="collapseMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          id="bread"
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          class="newColor"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
      <!-- <h3 style="color: #fff">首页</h3> -->
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState, mapMutations } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    ...mapMutations(["collapseMenu"]),
    // handleMenu(){
    //    this.$store.commit('collapseMenu')
    // // 新的写法

    // },
    // ...mapMutations['tab',"collapseMenu"]
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList, //返回的tagsList传入tags
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  height: 40px;
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.newColor /deep/ .el-breadcrumb__inner {
  color: #FFF ;
}
</style>