<template>
  <div class="manage">
    <!--根据 operateType  进行判断title的显示 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <!-- 这里预留了一个slot区域 可以插入 动态的组件 -->
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </CommonForm>
    </div>
    <!-- table方面的代码 -->
    <CommonTable 
    :tableData="tableData" 
    :tableLabel="tableLabel"
    :config="config"
    @changePage = "getList()"
    @edit = "editUser"
    @del = "delUser"
    > </CommonTable>
  </div>
</template>

<script>
import CommonForm from "../../../src/components/CommonForm.vue";
import CommonTable from "@/components/CommonTable";
// 引入接口
import {getUser} from '../../../api/data'
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
    
  },
  data() {
    return {
      // 下面的值是form需要的
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      /* 表单数据 可以传入mock的数据 */
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },

      // 下面的值是table需要的
      tableData: [],
      // label标签的值
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      // 分页组件
      config:{
        page:1,
        total:30
      }
    };
  },
  methods: {
    // 修改 或者 新增用户信息
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("./user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          // 重新获取数据
          this.getList()
        });
      } else {
        this.$http.post("./user/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          // 重新获取数据
          this.getList()
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    // 以下是table使用的方法
    // row 代表当前的数据 因为需要回显数据
    editUser(row){
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
      console.log('editUserrow==>',row)
    },
    delUser(row){
      // 点击删除用户时，将弹出此弹出框
      this.$confirm("此操作将永久删除文件，是否继续？","提示",{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() =>{
        const id = row.id
        this.$http.post("user/del",{
          params:{id}
        }).then(() =>{
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList()
        })
      })
    },
    getList(name = '') {
      // 调用api文件夹下的data中的接口
      this.config.loading = true
      name? (this.config.page = 1):''
      getUser({
        page:this.config.page,
        name
      }).then(({data:res}) =>{
        this.tableData = res.list.map(item =>{
          item.sexLabel = item.sex === 0?'女':'男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })

    },
  },
  created(){
    // 一开始就读取页
    this.getList()
  }
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>