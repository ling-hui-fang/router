<template>
  <div class="add container">
    <alert v-if="alert" v-bind:message="alert"></alert>
    <h1 class="page-header">添加用户</h1>
    <form v-on:submit="addCustomer">
      <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control"  placeholder="name" v-model="customer.name">
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
  name: 'add',
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
    addCustomer(e){
      if(!this.customer.name || !this.customer.phone || !this.customer.email){
          // console.log("请添加对应的信息");  
             this.alert = "请添加对应的信息"
      }else{
        let newCustomer = {
          name:this.customer.name,
          phone:this.customer.phone,
          email:this.customer.email,
          education:this.customer.education,
          graduationschool:this.customer.graduationschool,
          profession:this.customer.profession,
          profile:this.customer.profile
        }
        this.$http.post("http://localhost:3000/users",newCustomer)
        .then(function(response){
          this.$router.push({path:"/",query:{alert:'用户信息添加成功！'}})
          // console.log(response);
          e.preventDefault()
        })
      }
      e.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
