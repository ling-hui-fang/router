<template>
  <div class="edit container">
    <alert v-if="alert" v-bind:message="alert"></alert>
    <h1 class="page-header">编辑用户</h1>
    <form v-on:submit="updateCustomer">
      <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" v-model="customer.name" placeholder="name">
        </div>
        <div class="form-group">
          <label>电话</label>
          <input type="text" class="form-control" v-model="customer.phone" placeholder="phone">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="text" class="form-control" v-model="customer.email" placeholder="email">
        </div>
        <div class="form-group">
          <label>学历</label>
          <input type="text" class="form-control" v-model="customer.education" placeholder="education">
        </div>
        <div class="form-group">
          <label>毕业学校</label>
          <input type="text" class="form-control" v-model="customer.graduationschool" placeholder="graduationschool">
        </div>
        <div class="form-group">
          <label>职业</label>
          <input type="text" class="form-control" v-model="customer.profession" placeholder="profession">
        </div>
        <div class="form-group">
          <label>个人简介</label>
          <textarea class="form-control" rows="10" v-model="customer.profile"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">添加</button>
      </div>  
    </form>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'edit',
  components:{
    Alert
  },
  data () {
    return {
     customer:{},
     alert:""
    }
  },
  methods:{
    fetchCustomer(id){
      this.$http.get("http://localhost:3000/users/"+id)
      .then(function(response){
        // console.log(response.body);
        this.customer = response.body
      })
    },
    updateCustomer(e){
      if(!this.customer.name || !this.customer.phone || !this.customer.email){
          // console.log("请添加对应的信息");  
          this.alert = "请添加对应的信息"
      }else{
        let updateCustomer = {
          name:this.customer.name,
          phone:this.customer.phone,
          email:this.customer.email,
          education:this.customer.education,
          graduationschool:this.customer.graduationschool,
          profession:this.customer.profession,
          profile:this.customer.profile
        }
        this.$http.put("http://localhost:3000/users/"+this.$route.params.id,updateCustomer)
        .then(function(response){
          this.$router.push({path:"/",query:{alert:'用户信息跟新成功！'}})
          console.log(response);
          e.preventDefault()
        })
      }
      e.preventDefault()
    }
    
  },
  created(){
      this.fetchCustomer(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
