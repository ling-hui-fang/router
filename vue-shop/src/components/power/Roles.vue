<template>
    <div class="roles">
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
       <!-- 卡片视图 -->
       <el-card>
           <el-row>
               <el-col>
                    <el-button type="primary">添加角色</el-button>
               </el-col>
           </el-row>

           <!-- 角色列表区域 -->
           <el-table :data="rolelist" border stripe>
               <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item1,i1) in scope.row.children" 
                                :key="item1.id"
                                :class="['bdbottom',i1 === 0 ? 'bdtop':'','vcenter']"
                                >
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag>{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>

                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!-- 通过for 循环 嵌套渲染二级权限 -->
                                <el-row v-for="(item2,i2) in item1.children" 
                                        :key="item2.id"
                                        :class="[i2 === 0 ? '':'bdtop','vcenter']">
                                    <el-col :span="6"> 
                                        <el-tag type="success">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 渲染三级菜单 -->
                                    <el-col :span="18">
                                        <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog">分配权限</el-button>
                    </template>
                </el-table-column>
           </el-table>
       </el-card>
       <!-- 分配权限的对话框 -->
       <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%">
        <!-- 树形控件 -->
        <el-tree :data="rightslist" 
                 :props="treeProps" 
                 show-checkbox node-key="id" 
                 default-expand-all
                 :default-checked-keys="defKeys"
                 ></el-tree>

        <span slot="footer" class="dialog-footer">
            <el-button @click="setRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    name: 'roles',
    data () {
      return {
        rolelist:[],
        setRightDialogVisible:false,
        rightslist:"",
        //树形控件的属性绑定对象
        treeProps:{
            label:"authName",
            children:"children"
        },
        //默认选中的节点ID值数组
        defKeys:[102,125]
      }
    },
    created(){
        this.getRolesList()
    },
    methods:{
        //获取所有角色的列表
       async getRolesList(){
            const {data:res} = await this.$http.get('roles')
            console.log(res);
            if(res.meta.status !== 200){
                return this.$message.error('获取角色列表失败')
            }
            this.rolelist = res.data
        },
        //根据id删除对应的权限
       async removeRightById(){
        const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
        //    console.log(confirmResult); 
            if(confirmResult !== 'confirm'){
               return  this.$message.info('取消删除!')
            }
            console.log("确定删除");
        },
        //展示分配权限的对话框
        async showSetRightDialog(){res
            const {data:res} = await this.$http.get('rights/tree')
            console.log(res);
            if(res.meta.status !== 200){
                return this.$message.error('获取权限失败')
            }
            this.rightslist = res.data
            this.setRightDialogVisible = true
        }
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bdtop {
      border-top:1px solid #eee;
  }
  .bdbottom {
    border-bottom:1px solid #eee;
  }
  .el-tag {
      margin:7px;
  }
  .vcenter{
      display:flex;
      align-items:center;
  }
</style>
  