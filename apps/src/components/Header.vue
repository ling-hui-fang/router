<template>
  <div class="header" @click="titleChange">
   <h1>{{title1}}{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'header',
  props:{
    title:{
      type:String
    }
  },
  data () {
    return {
      title1:"这是标题"
    }
  },
  methods:{
    titleChange(){
      this.$emit("titleChanged",'子像父组件传值')
    }
  },
  // beforeCreate(){
  //   alert('组件实例化之前执行的函数')
  // },
  // created(){
  //   alert('组件实例化完毕，但页面还未显示')
  // },
  // beforeMount(){
  //   alert('组件挂载前，页面仍未展示，但虚拟Dom已经配置"')
  // },
  // Mounted(){
  //   alert('组件挂载后，此方法执行后，页面显示')
  // },
  // beforeUpdate(){
  //   alert('组件更新前，页面仍未更新，但虚拟DOM已经配置')
  // },
  // updated(){
  //   alert('组件更新，此方法执行后，页面显示')
  // },
  // beforeDestory(){
  //   alert('组件销毁前')
  // },
  // destoryed(){
  //   alert("组件销毁了")
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  background:lightgreen;
  padding:10px;
}
.header h1 {
  color:#222;
  text-align:center;

}
</style>
