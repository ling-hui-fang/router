<template>
  <div class="login_container">
   <div class="login_box">
     <!-- 头部样式 -->
     <div class="avatar_box">
       <img src="../assets/logo.png">
     </div>
    <!-- 登录表单 -->
    <el-form label-width="0" class="login-form" :model="Loginform" :rules="LoginformRules" ref="LoginformRef">
      <el-form-item prop="username">
        <el-input  prefix-icon="el-icon-search" v-model="Loginform.username"></el-input> 
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-search" v-model="Loginform.password" type="password"></el-input> 
      </el-form-item>
      <el-form-item class="btns">
         <el-button type="primary" @click="login">登录</el-button>
         <el-button type="info" @click="resetLoginform">重置</el-button>
      </el-form-item>
    </el-form>
   </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      Loginform:{
        username:"",
        password:""
      },
      LoginformRules:{
        username:[
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    resetLoginform(){
      // console.log(this);
      this.$refs.LoginformRef.resetFields()
    },
    login(){
      this.$refs.LoginformRef.validate(async valid => {
        // console.log(valid);
        if(!valid) return;
        const {data:res} = await this.$http.post('login',this.Loginform)
         console.log(res)
         if(res.meta.status !== 200) return console.log("登录失败");
         console.log("登录成功");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container{
  background-color:#2b4b6b;
  height:100%;
}
.login_box{
  width:450px;
  height:300px;
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  border-radius:3px;
  background-color: #fff;
}
.avatar_box{
  width:130px;
  height:130px;
  border:1px solid #eee;
  border-radius:50%;
  box-shadow:0 0 10px#eee;
  padding:10px;
  position: absolute;
  left:50%;
  transform:translate(-50%,-50%);
  background-color: #fff;
  img{
    width:100%;
    height:100%;
    border:1px solid #eee;
    border-radius:50%;

  }
}
.login-form{
  position: absolute;
  bottom:0;
  width:100%;
  padding:0 20px;
  box-sizing:border-box;
}
.btns{
  display:flex;
  justify-content:flex-end;
}
</style>
