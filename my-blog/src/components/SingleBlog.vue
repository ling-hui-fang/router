<template>
  <div class="single-blog">
    <h1>{{blog.title}}</h1>
    <p>{{blog.body}}</p>
  </div>
</template>

<script>
export default {
  name: 'single-blog',
  data () {
    return {
      id:this.$route.params.id,
      blog:{}
    }
  },
  created(){
    this.$http.get("http://jsonplaceholder.typicode.com/posts/"+this.id)
    .then(function(data){
      console.log(data);
      this.blog = data.body
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.single-blog{
  max-width:960px;
  margin:0 auto;
  padding:20px;
  background:#eee;
  border:1px dotted #aaa;
}
</style>
