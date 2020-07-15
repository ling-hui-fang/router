<template>
  <div class="footer">
   <p>{{copright}}{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'footer',
   props:{
    title:{
      type:String
    }
  },
  data () {
    return {
      copright:"这是底部的内容"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background:#222;
  padding:6px;
}
.footer p {
  color:lightgreen;
  text-align:center;

}
</style>
