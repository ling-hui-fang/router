<template>
  <div class="home">
   <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
