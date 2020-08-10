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
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>
          <!-- 动态属性表格 -->
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable>
                  {{item}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>  
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>
           <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable>
                  {{item}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加'+ titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed">
      <!-- 表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 展示修改的对话框 -->
     <el-dialog
      :title="'修改'+ titleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed">
      <!-- 表单 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>

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
      activeName:"many",
      manyTableData:[],
      onlyTableData:[],
      addDialogVisible:false,
      addForm:{
        attr_name:""
      },
      addFormRules:{
        attr_name:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ]
      },
      editDialogVisible:false,
      editForm:{
        attr_name:""
      },
      editFormRules:{
        attr_name:[
           { required: true, message: '请输入活动名称', trigger: 'blur' },
        ]
      }

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
      // console.log(this.cateList)
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
      // console.log(res);
      res.data.forEach(item =>{
        item.attr_vals = item.attr_vals.split(' ')
      })
      console.log(res.data);

      if(this.activeName == "many"){
        this.manyTableData = res.data
      }else{
        this.onlyTableData = res.data 
      }
    },
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
    addParams(){
      this.$refs.addFormRef.validate(async valid =>{
        if(!valid) return 
        const {data:res} = await this.$http.post(`categories/${this.cateId}/attributes`,{
          attr_name:this.addForm.attr_name,
          attr_sel:this.activeName
        })
        if(res.meta.status !== 201){
          return this.$message.error('添加参数失败')
        }
        this.$message.success('添加参数成功！')
        console.log(res.data);
        this.getParamsData()
        this.addDialogVisible = false
      })
    },
    async showEditDialog(attr_id){
      // 查询当前参数的信息
      const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`,{
        params:{
          attr_sel:this.activeName
        }
      })
      if(res.meta.status !== 200){
        return this.$message.error('获取参数信息失败！')
      }

      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    //点击按钮修改参数信息
    editParams(){
      this.$refs.editFormRef.validate(async valid =>{
        if(!valid) return
        const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{
          attr_name:this.editForm.attr_name,
          attr_sel:this.activeName
        })
        // console.log(res);
        if(res.meta.status !== 200){
          return this.$message.error('修改参数失败')
        }
        this.$message.success('修改参数成功')
        this.getParamsData()
        this.editDialogVisible = false
      })
    },
    //根据Id删除对应的参数项
    async removeParams(attr_id){
    const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        // console.log(confirmResult);
        if(confirmResult !== 'confirm'){
          return this.$message.info('已经取消删除')
        }
        const { data:res } = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
        console.log(res);
        if(res.meta.status !== 200){
          return this.$message.error('删除失败')
        }
        this.$message.success('删除成功')
        this.getParamsData()
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
    },
    titleText(){
      if(this.activeName == "many"){
        return "动态参数"
      }else{
        return "静态属性"
      }
    }
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
.el-tag {
  margin:0 10px;
}
</style>
  