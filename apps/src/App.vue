<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/helloworld">hello</router-link>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components: {
   
  },
  methods:{
    
  }
}
</script>

<style>

</style>
