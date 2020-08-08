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
          <el-cascader
            v-model="selectedCatekeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>

        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
  
<script>
export default {
  name: 'params',
  data() {
    return {
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      selectedCatekeys: [],
      activeName:"many"
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //获取所有的商品分类列表
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        this.$message.error('获取商品分类失败')
      }
      this.cateList = res.data
      console.log(this.cateList)
    },
    //级联选择框选中项变化，会触发这个函数
    handleChange() {
      // console.log(this.selectedCatekeys)
      this.getParamsData()

    },
    //tab页签点击事件的处理函数
    handleTabClick(){
      // console.log(this.activeName);
       this.getParamsData()
    },
    //获取参数的列表数据
    async getParamsData(){
      //证明选中的不是三级分类
      if(this.selectedCatekeys.length !== 3){
        this.selectedCatekeys = []
        return
      }
      //证明选中的是三级分类
      // console.log( this.selectedCatekeys);
      const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
        params:{sel:this.activeName}
      })
      if(res.meta.status !== 200){
        this.$message.error('获取参数列表失败！')
      }
      console.log(res.data);
    }
  },
  computed:{
    //如果按钮需要被禁用，则返回true,否者返回false
    isBtnDisabled(){
      if(this.selectedCatekeys.length !== 3){
        return true
      }
      return false
    },
    cateId(){
      if(this.selectedCatekeys.length === 3){
        return this.selectedCatekeys[2]
      }
      return null
    }
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
  