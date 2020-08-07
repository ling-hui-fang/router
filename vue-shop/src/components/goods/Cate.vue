<template>
  <div class="cate">
   <!-- 面包屑导航 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <tree-table :data="catelist" 
                    :columns="columns"
                    :selection-type="false"
                    :expand-type="false"
                    :show-index="true"
                    index-text="#"
                    border
                    :show-row-hover="false"
                    class="treeTable"
                    >
          <!-- 是否有效 -->
          <template slot="isok" slot-scope="scope">
            <i class="el-icon-success" style="color:lightgreen" v-if="scope.row.cat_deleted === false"></i>
            <i class="el-icon-error" style="color:red" v-else></i>
          </template>
          <!-- 排序 -->
          <template slot="order" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
          <!-- 操作 -->
          <template slot="opt" slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </template>

        </tree-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      <!-- 添加分类的对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="50%"
        @close="addCateDialogClosed">
        <!-- 添加分类的表单 -->
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
          <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="addCateForm.cate_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <!-- options 用来指定数据源 -->
            <!-- props 用来指定配置对象 -->
            <el-cascader
              v-model="selectedKeys"
              :options="parentCateList"
              :props="cascaderProps"
              @change="parentCateChanged"
              clearable>
            </el-cascader>                         
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'cate',
  data () {
    return {
      queryInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
      //商品分类的数据列表，默认为空
      catelist:[],
      total:0,
      //为table指定列的定义
      columns:[
        {
          label:'分类名称',
          prop:'cat_name'
        },{
          label:'是否有效',
          type:"template",
          template:"isok"
        },{
          label:"排序",
          type:"template",
          template:"order"
        },{
          label:"操作",
          type:"template",
          template:"opt"
        }
      ],
      // 展示添加分类的显示与隐藏
      addCateDialogVisible:false,
      //添加分类的表单的数据对象
      addCateForm:{
        //将要添加分类的名称
        cate_name:"",
        //父级分类的ID
        cat_pid:0,
        //分类的等级,默认要添加的1级
        cat_level:0
      },
      //添加分类表单的验证规则对象
      addCateFormRules:{
        cate_name:[
         { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
      },
      parentCateList:[],
      cascaderProps:{
        expandTrigger:"hover",
        checkStrictly:"true",
        value:"cat_id",
        label:"cat_name",
        children:"children"
      },
      // 选中父级分类的Id数组
      selectedKeys:[]
    }
  },
  created(){
    this.getCateList()
  },
  methods:{
    //获取商品分类数据
    async getCateList(){
    const {data:res} = await this.$http.get('categories',{params:this.queryInfo})

        if(res.meta.status !== 200){
          return this.$message.error("获取商品分类失败")
        }
        this.catelist = res.data.result
        
        this.total = res.data.total
        // console.log(res);
    },
    //监听pagesize的改变
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    //监听pagenum的改变
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog(){
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    //获取父级分类数据
    async getParentCateList(){
      const {data:res} = await this.$http.get('categories',{params:{type:2}
    })
      if(res.meta.status !== 200){
        return this.$message.error('获取父级分类数据失败')
      }
      this.parentCateList = res.data
      console.log(res);
    },
    //选择发生变化时触发这个函数
    parentCateChanged(){
      //如果selectedKeys数组中的length大于0,证明选中父级分类,
      //反之说明没有选中任何父级分类
      if(this.selectedKeys.length > 0) {
        //父级分类的Id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length-1]
        //为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      }else{
        //父级分类的Id
        this.addCateForm.cat_pid = 0
        //为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
      // console.log(this.selectedKeys);
    },
    //点击按钮,添加新的分类
    addCate(){
      console.log(this.addCateForm);
      this.$refs.addCateFormRef.validate(async valid => {
        if(!valid) return
        const {data:res} = await this.$http.post('categories',this.addCateForm)
        console.log(res);
        if(res.meta.status !== 201){
          return this.$message.error('添加分类失败')
        }
        this.$message.success('获取分类成功')
        this.getCateList()
        this.addCateDialogVisible = false
      })

    },
    //监听对话框的关闭事件,重置表单数据
    addCateDialogClosed(){
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.treeTable{
  margin-top:15px;
}
.el-cascader{
  width:100%;
}
</style>
