<template>
  <div class="users">
   <ul>
     <li v-for="user in users">
       <h1>{{user.name}}</h1>
       <p>{{user.email}}</p>
     </li>
   </ul>
   <button @click="deleteUser">删除</button>
  </div>
</template>

<script>
export default {
  name: 'users',
  props:{
    users:{
      type:Array,
      required:true
    }
  },
  data () {
    return {
   
    }
  },
  methods:{
    deleteUser(){
      this.users.pop()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users{
  width:100%;
  max-width:1200px;
  box-sizing:border-box;
  margin:40px 0;
  padding:0 20px;
}
ul{
  display:flex;
  flex-wrap:wrap;
  list-style:none;
}
li{
  flex-grow:1;
  flex-basis:300px;
  padding:30px;
  margin:10px;
  border:1px solid #222;
  text-align: center;
}
</style>
