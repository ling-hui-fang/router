<template>
  <div id="add-blog">
    <h2>写博客</h2>
    <form v-show="!submmited">
      <label>博客标题</label>
      <input type="text" v-model="blog.title">
      <label>内容:</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label>node.js</label>
        <input type="checkbox" value="node.js"  v-model="blog.categories">
        <label>React.js</label>
        <input type="checkbox" value="React.js"  v-model="blog.categories">
        <label>Angular4</label>
        <input type="checkbox" value="Angular4"  v-model="blog.categories">
      </div>
      <label>作者:</label>
      <select v-model="blog.author">
        <option v-for="author in authors">
          {{author}}
        </option>
      </select>
      <button v-on:click.prevent="post">添加博客</button>
    </form>
    
    <div v-show="submmited">
      <h3>您的博客发布成功</h3>
    </div>
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容:</p>
      <p>{{blog.content}}</p>
      <p>博客分类:</p>
      <ul>
        <li v-for="categorie in blog.categories">
          {{categorie}}
        </li>
      </ul>
      <p>作者:{{blog.author}}</p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'add-blog',
  data () {
    return {
      blog:{
        title:"",
        content:"",
        categories:[],
        author:""
      },
      authors:["Hmiah","henry","kim"],
      submmited:false
    }
  },
  methods:{
    post:function(){
      this.$http.post("http://jsonplaceholder.typicode.com/posts",{
        title:this.blog.title,
        body:this.blog.content,
        userId:1
      })
        .then(function(data){
        console.log(data);
        this.submmited = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
  box-sizing: border-box;
}
#add-blog {
  padding:20px;
  max-width:600px;
  margin:20px auto;
}
label{
  display:block;
  margin:20px 0 10px;
}
input[type="text"],textarea,select{
  display:block;
  width:100%;
  padding:8px;
}
textarea{
  height:200px;
}
#checkboxes label{
  display:inline-block;
  margin-top:0;
}
#checkboxes input{
  display:inline-block;
  margin-right:10px;
}
button{
  display:block;
  margin:20px 0;
  background:crimson;
  color:#fff;
  padding:14px;
  border:0;
  border-radius:4px;
  font-size:18px;
  cursor: pointer;
}
#preview{
  padding:10px 20px;
  border:1px dotted #ccc;
  margin:30px 0;
}
#preview h3{
  margin-top:10px;
}
</style>
