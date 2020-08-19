<template>
  <div class="show-blogs" v-theme:column="'narrow'" >
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlogs" class="single-blog" :key="blog.id">
      <router-link v-bind:to="'/blog/'+ blog.id">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article>{{blog.body | snippet}}</article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data () {
    return {
      blogs:[],
      search:""
    }
  },
  created(){
    // this.$http.get("http://jsonplaceholder.typicode.com/posts")
    // this.$http.get("../src/assets/posts.json")错误的
    this.$http.get("./static/posts.json")
    .then(function(data){
      // console.log(data);
      this.blogs = data.body.slice(0,10)
      
    })
  },
  computed:{
    filteredBlogs(){
     return this.blogs.filter((blog)=>{
       return blog.title.match(this.search)
     })
    }
  },
  // 局部过滤
  filters:{
    // 'to-uppercase':function(value){
    //   return value.toUpperCase()
    // },
    toUppercase(value){
      return value.toUpperCase()
    },

  },
  //自定义指令
  directives:{
    'rainbow':{
      bind(el,binding,vnode){
        el.style.color = '#'+Math.random().toString(16).slice(2,8)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show-blogs{
  max-width:800px;
  margin:0 auto;
}
.single-blog{
  padding:20px;
  margin:20px 0;
  background:#eee;
  box-sizing:border-box;
  border:1px dotted #aaa;
}
.single-blog a{
  text-decoration:none;
  color:#444;
}
input[type=text]{
  width:100%;
  padding:8px;
  box-sizing:border-box;
}
</style>
