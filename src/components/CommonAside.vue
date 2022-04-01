<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse ? "人脸" : "人脸识别录入管理系统" }}</h3>
      <!-- 没有子项目的菜单 -->
      <el-menu-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path + ''"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 有子项目的菜单 -->
      <el-submenu

        v-for="item in hasChildren"
        :index="item.path + ''"
        :key="item.name"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="(subItem, subIndex) in item.children"
          :key="subItem.path"
          :index="subItem.path"
        >
          <el-menu-item @click="clickMenu(subItem)" :index="subIndex.path">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取路由名字
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit('selectMenu',item)
    },
  },
  //   计算属性  多个值改变会影响一个值
  computed: {
    noChildren() {
      // filter过滤器
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      // 从 vuex的state中拿到tab模块的isCollapse值
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },
};
</script>

<style lang="less" scoped >
#aside {
  height: 852px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  top: 0%;
  width: 200px;
  min-height: 400px;
}
</style>