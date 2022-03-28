<template>
  <div class="manage">
    <!--根据 operateType  进行判断title的显示 -->
    <el-dialog title="编辑人脸库" :visible.sync="isShow">
      <!-- 中间主体内容部分 -->
      <div class="Form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="员工编号" prop="userid">
            <el-input v-model="ruleForm.userid"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="women"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>

          <el-form-item label="归属组织" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择组织">
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span style="float: left; margin-left: 40px">
              依次为：正脸照片，左侧脸照，右侧脸照，仰视照，俯视照</span
            >
            <span style="color: gray">只支持JPG模式</span>
          </el-form-item>

          <!-- 照片上传 -->
          <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
            <el-upload
              action="#"
              class="upload-demo"
              list-type="picture-card"
              :file-list="fileList"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="BeforeUpload"
              :http-request="Upload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
        </el-form>
      </div>
      <!-- 底部两个按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>

    <el-button type="primary" @click="addUser">+新增</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CommonFaceDialog",
  data() {
    return {
      isShow: false,
      fileList: [],
      newFile: new FormData(), //1. 定义一个newFile变量（FormData 对象）
      //员工 信息 对象
      ruleForm: {
        userid: "",
        name: "",
        sex: "男",
        phone: "",
        type: "",
      },
      options: [
        {
          label: "组织一",
          options: [
            {
              value: "czzxyyt2",
              label: "创展中心营业厅2",
            },
            {
              value: "czzxyyt",
              label: "创展中心营业厅",
            },
          ],
        },
        {
          label: "组织二",
          options: [
            {
              value: "zzmzz1",
              label: "组织二中某组织一",
            },
            {
              value: "zzmzz2",
              label: "组织二中某组织二",
            },
          ],
        },
      ],

      rules: {
        userid: [{ required: true, message: "请输入员工编号" }],
        name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        type: [
          {
            message: "请至少选择一个组织",
            trigger: "change",
          },
        ],
        imageUrl: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 控制对话框显示
    addUser() {
      this.ruleForm= {
        userid: "",
        name: "",
        sex: "男",
        phone: "",
        type: "",
       };      
      this.isShow = true;
      this.fileList= [];
       
       console.log(this.ruleForm);
    },
    // 修改 或者 新增用户信息
    confirm() {
      // 修改为接口  将信息传入后端
      console.log(this.ruleForm);
      console.log("点击确认按钮");    
      console.log('this.fileList.length',this.fileList.length);
      if(this.fileList.length ==5){
        this.isShow = false 
      }else{
        return alert("必须提交五张照片")
      }
    },
    // 图片上传成功时
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传前的图片校验
    BeforeUpload(file) {
      if (file) {
        this.newFile.append("file", file); //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。
        console.log(this.newFile.get("file"));
      } else {
        return false;
      }
      const isJPG = file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;
      console.log(file);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt10M;
    },
    //图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

 

    // 图片上传
    Upload() {
      const newData = this.newFile; //  3. 拿到刚刚的数据，并将其传给后台
      axios({
        url: "https://jsonplaceholder.typicode.com/posts/",
        method: "post",
        data: newData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("res:", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>