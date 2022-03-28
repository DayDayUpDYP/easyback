<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <!-- 这是循环出来的有数据的列 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 能够自定义接收一些相关配置  作用域插槽-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 进行编码 -->
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页组件 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    /* 外部传入的值 */
    tableData: Array,
    tableLabel: Array,
    config: Object, //控制分页的
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    // 分页函数
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scpoed>
.common-table {
  height: calc(100% - 62px); /* 这个cacl 值得一看  我还不了解 */
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>