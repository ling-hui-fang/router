<template>
  <div class="add">
     <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
        <!-- 警告框 -->
         <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
        </el-alert>
        <!-- Steps 步骤条 -->
        <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <!-- tabs 栏标签页 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
            <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabclicked">
                <el-tab-pane label="基本信息" name="0">
                <!-- 基本信息 -->
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="addForm.goods_price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="addForm.goods_weight" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="addForm.goods_number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader
                            v-model="addForm.goods_cat"
                            :options="catelist"
                            :props="cateProps"
                            @change="handleChange">
                        </el-cascader>  
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <!-- 商品参数 -->
                    <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                        <!-- 复选框 -->
                         <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="2">
                    <!-- 商品属性 -->
                    <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <!-- 商品图片 -->
                    <el-upload
                        :action="uploadURL"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        list-type="picture"
                        :headers="headerObj"
                        :on-success="handleSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <!-- 商品内容/富文本编辑器-->
                    <quill-editor v-model="addForm.goods_introduce">

                    </quill-editor>
                    <el-button type="primary" @click="add" class="btnAdd">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
       </el-form>
    </el-card>
    <!-- 图片预览对话框 -->
    <el-dialog
        title="图片预览"
        :visible.sync="previewVisible"
        width="50%">
        <img :src="previewPath" class="previewImg">  
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'add',
  data () {
    return {
      activeIndex:'0',
      addForm:{
          goods_name:"",
          goods_price:0,
          goods_weight:0,
          goods_number:0,
          goods_cat:[],
          pics:[],
          goods_introduce:"",
          attrs:[]
      },
      addFormRules:{
          goods_name:[
              { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          goods_price:[
              { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          goods_weight:[
              { required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          goods_number:[
              { required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          goods_cat:[
              { required: true, message: '请选择商品分类', trigger: 'blur' }
          ]
      },
      catelist:[],
      cateProps:{
          expandTrigger:'hover',
          checkStrictly:'false',
          value:'cat_id',
          label:'cat_name',
          children:'children'
      },
      //动态参数列表数据
      manyTableData:[],
      //静态参数列表数据
      onlyTableData:[],
      //上传图片的Url地址
      uploadURL:"http://119.23.53.78:8888/api/private/v1/upload",
      //图片上传组件的headers请求头对象
      headerObj:{
          Authorization: window.sessionStorage.getItem('token')
      },
      previewPath:"",
      previewVisible:false
    }
  },
  created(){
      this.getcateList()
  },
  methods:{
     async getcateList(){
        const {data:res} = await this.$http.get('categories')
        if(res.meta.status !== 200){
            return this.$message.error('获取商品分类数据失败')
        }
        // this.$message.success('获取商品分类数据成功')
        this.catelist = res.data
        // console.log(this.catelist)
     },
     handleChange(){
        //  console.log(this.addForm.goods_cat);
        if(this.addForm.goods_cat.length !== 3){
           this.addForm.goods_cat = [] 
        }
     },
     beforeTabLeave(activeName,oldActiveName){
        //  console.log("即将离开的标签页名字是:"+ oldActiveName);
        //  console.log("即将进入的标签页名字是:"+ activeName);
        if(oldActiveName === '0' && this.addForm.goods_cat.length !== 3){
            this.$message.error('请选择商品分类!')
            return false
        }
     },
     async tabclicked(){
        // console.log(this.activeIndex) 
        if(this.activeIndex === '1'){
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
                params:{sel:'many'}
            })
            if(res.meta.status !== 200){
                return this.$message.error('获取动态参数列表失败！')
            }
            res.data.forEach(item => {
             item.attr_vals =
             item.attr_vals.length === 0 ? [] :
                item.attr_vals.split(' ')
            })
            console.log(res.data);
            this.manyTableData = res.data

        }else if(this.activeIndex === '2'){
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,{
                params:{sel:'only'}
            })
            if(res.meta.status !== 200){
                return this.$message.error('获取静态属性面板失败')
            }
            this.onlyTableData = res.data
            console.log(this.onlyTableData);
        }

     },
     //图片预览
     handlePreview(file){
         console.log(file);
         this.previewPath = file.response.data.url
         console.log(this.previewPath);
         this.previewVisible = true
     },
     //处理图片的移除操作
     handleRemove(file){
        //  console.log(file);
         const filePath = file.response.data.tmp_path
         const i = this.addForm.pics.findIndex(x => x.pic === filePath)
         this.addForm.pics.splice(i,1)
        //  console.log(this.addForm.pics);
     },
    //  图片上传成功的函数
     handleSuccess(response){
        //  console.log(response);
         const picInfo = {
             pic : response.data.tmp_path
         }
         this.addForm.pics.push(picInfo)
        //  console.log(this.addForm.pics);
     },
     //添加商品
     add(){
        this.$refs.addFormRef.validate(async valid => {
            if(!valid){
                return this.$message.error('请填写必要的表单项')
            }
            //执行添加的业务逻辑
            // lodash cloneDeep(obj)
            const form = _.cloneDeep(this.addForm)
            form.goods_cat = form.goods_cat.join(',')

            //处理动态参数
            this.manyTableData.forEach(item => {
                const newInfo = {
                    attr_id: item.attr_id,
                    att_value: item.attr_vals.join(' ')
                }
                this.addForm.attrs.push(newInfo)
            })
            //处理静态参数
            this.onlyTableData.forEach(item =>{
                const newInfo = {
                    attr_id: item.attr_id,
                    att_value: item.attr_vals
                }
                this.addForm.attrs.push(newInfo)
            })
            form.attrs = this.addForm.attrs
            console.log(form);

            //发起请求添加商品
            const { data:res } = await this.$http.post('goods',form)
            if(res.meta.status !== 201){
                return this.$message.error('添加商品失败')
            }
            this.$message.success('添加商品成功')
            this.$router.push('/goods')

        })
     }
  },
  computed:{
      cateId(){
          if(this.addForm.goods_cat.length === 3){
              return this.addForm.goods_cat[2]
          }
          return null
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-checkbox {
    margin:0 10px 0 0!important;
}
.previewImg {
    width:100%;
}
.btnAdd {
    margin-top:10px;
}
</style>
