<template>
  <div class="home">
    <app-header v-on:titleChanged="updateTitle($event)" v-bind:title="title"></app-header>
    <users v-bind:users="users"></users>
    <users v-bind:users="users"></users>
    <app-footer v-bind:title="title" ></app-footer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import Users from './Users'

export default {
  name: 'App',
  data(){
    return {
         users:[
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
          // {name:"凌惠芳",job:'web开发',show:false},
        ],
        title:"传值"
    }
  },
  components: {
    'app-header':Header,
    'app-footer':Footer,
    'users':Users
  },
  methods:{
    updateTitle(title){
      this.title = title
    }
  },
  created(){
    this.$http.get("http://jsonplaceholder.typicode.com/users").then((data)=>{
      console.log(data)
      this.users = data.body
    })
  }
}
</script>

<style>

</style>
