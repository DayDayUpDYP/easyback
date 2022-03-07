<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="mini"
    >
      {{ tag.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods: {
    ...mapMutations({closeTag:'closeTag'}),
    changeMenu(tag) {
      // 函数式编程导航
      this.$router.push({
        name: tag.name,
      });
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      // 如果点击的name与当前路由不同 不做跳转处理
      this.closeTag(tag)  //调用 mapMutation方法里面的closeTag方法
      if (tag.name !== this.$route.name) {
        return;
      }

      // 如果是最后一个 需要往左边跳转 颜色高亮
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 如果右边跳转
        this.$router.push({
          name: this.tags[index].name, // 这里等于index是的原因是 点击删除时，当前标签已经删除。
        })
        
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>