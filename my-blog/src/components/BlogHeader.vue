<template>
  <div class="blog-header">
    <nav>
      <ul>
        <li>
          <router-link to="/" exact>博客</router-link>
          <router-link to="/add" exact>写博客</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'blog-header',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul{
    list-style-type:none;
    text-align:center;
    margin:0;
  }
  li{
    display:inline-block;
    margin:0 10px;
  }
  a{
    color:#fff;
    text-decoration:none;
    padding:12px;
    border-radius:5px;
  }
  nav{
    padding:30px 0;
    background:crimson;
    margin-bottom:40px;
  }
  .router-link-active{
    background:rgba(255,255,255,0.8);
    color:#444;
  }
</style>
