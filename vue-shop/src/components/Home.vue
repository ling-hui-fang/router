<template> 
   <el-container class="home-container">
     <!-- 头部 -->
      <el-header>
        <div>
          <img src="../assets/logo.png">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 导航菜单侧边栏 -->
        <el-aside width="200px">
          <el-menu background-color="#333744" 
                   text-color="#fff"
                   active-text-color="#ffd04b"
                  >
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>导航一</span>
              </template>

                <!-- 二级菜单 -->
                <el-menu-item index="1-4-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                </el-menu-item>
                
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home-container {
  height:100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content:space-between;
  padding-left:0;
  align-items: center;
  color:white;
  font-size:20px;
  >div{
    display: flex;
    align-items:center;
    >img{
      width:80px;
      height:80px;
    }
  }
  
}
.el-aside {
   background-color:#333744;
}
.el-main {
  background-color:#EAEDF1;
}
</style>
