<template>
  <div class="list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                 <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table :data="goodslist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格" prop="goods_price" width="95"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight" width="70"></el-table-column>
            <el-table-column label="创建时间" prop="add_time" width="140">
                <template slot-scope="scope">
                    {{scope.row.add_time | dateFormat}}
                </template>   
            </el-table-column>
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>    
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      queryIfo:{
          query:"",
          pagenum:1,
          pagesize:10
      },
      goodslist:[],
      total:""
    }
  },
  created(){
      this.getGoodList()
  },
  methods:{
      async getGoodList(){
        const {data:res} = await this.$http.get('goods',{params:this.queryIfo})
        if(res.meta.status !== 200){
            this.$message.error("获取列表数据失败")
        }
        // this.$message.success("获取列表数据成功")
        this.goodslist = res.data.goods
        this.total = res.data.total
        console.log(res);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
