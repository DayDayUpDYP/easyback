<template>
  <!-- 封装 Form组件 -->
  <div class="Form">
    <!-- model是绑定表单数据的 这里绑定的是propos中的form 父组件传值传入props -->
    <el-form ref="form" :model="form" label-width="100px" :inline="inline">
      <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :label="item.label"
      >
      <!-- 下面的input框或者switch框 是会根据 formLabel的返回值确定的 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="form[item.model]"
          :placeholder="'请输入' + item.label"
        ></el-input>
        <el-switch
          v-if="item.type === 'switch'"
          v-model="form[item.model]"
        ></el-switch>
        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="form[item.model]"
        ></el-date-picker>
        <el-select
          v-if="item.type === 'select'"
          v-model="form[item.model]"
          placeholder="请选择"
        >
          <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 当给定的样式不满足的时候 我们可以使用插槽技术  有插槽的是子 -->
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CommonForm",
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
};
</script>

<style>
</style>