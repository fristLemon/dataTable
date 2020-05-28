<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
html, body{
  padding: 0; margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #303133; height: 100%;
}
.telWidth{
  margin: auto;
  max-width: 640px; font-size: 14px;
  
  .el-table .success-row {
    /*background: #f2f6fc; 
     color: #f56c6c;  */
    font-weight: bold;
  }
  /* .el-table td{
    text-align: center;
  } */
  .el-table__placeholder{
    width: 5px;
  }
  .el-table__footer-wrapper tbody td {
    color: #f56c6c;  
    font-weight: bold;
  }
  .el-tabs__nav-scroll  {
      overflow-x: scroll !important;
  }
  /*隐藏掉滚动条*/
  .el-tabs__nav-scroll::-webkit-scrollbar {
      display: none;
  }
  
}
#backstage{
  .show-row {
    background: #f0f9eb;
  }
}


</style>
