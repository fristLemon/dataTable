<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  padding: 0; margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #303133;
  margin: auto;
  max-width: 640px;
}
.el-table .success-row {
    /* background: #fde2e2; */
    color: #f56c6c; font-weight: bold;
  }
  .el-table td{
   text-align: center;
 }
</style>
