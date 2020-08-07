<template>
    <div class="params">
     <!-- 面包屑导航 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告框 -->
        <el-alert
          title="注意只允许第三级分类设置相关参数"
          type="warning"
          :closable="false"
          show-icon
        >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt"> 
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
        </el-col>
      </el-row>
    </el-card>
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'params',
    data () {
      return {
        
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
  .cat_opt{
    margin:15px 0;
  }
  </style>
  