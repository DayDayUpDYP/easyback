<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login_container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入账号"
      >
      </el-input>
    </el-form-item>

    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      >
      </el-input>
    </el-form-item>

    <el-form-item class="login_submit">
        <el-button type="primary" @click="login" class="login_submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs'
// 引入接口路径
import {getMenu} from '../../../api/data'
export default {
  name: "Login",
  data() {
    return {
      // 传入的表单数据
      form: {},
      // 表单校验规则  标签上的prop表示需要校验的表单名
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, message: "用户名的长度不能小于2位", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods:{
    //   登录选项
      login(){
        //   请求登录接口
        getMenu(this.form).then(res=>{
            if(res.code === 20000){
                // 需要拿到token 
                //需要对不同账号配置不同权限
                // 实现跳转
            }else{
                this.$message.warning(res.data.message)
            }
        })
        //   登录的时候需要设置token
       const token = Mock.random.guid() //mock生成一个 随机数
       this.store.commit('setToken',token)
       this.$router.push({name:'home'})

      }
  },
  created:function(){
      console.log('aaaaa')
  }
};
</script>

<style lang="less" scoped>
.login_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;

}
.login_submit{
    margin: 10px auto 0px auto;
}
</style>