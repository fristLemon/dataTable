<template>

  <div class="go-top" v-if="iFlag" @click="backTop">
    <i class="el-icon-top"></i>
  </div>
</template>

<script>
export default {
  name: 'gotop',
  data(){
    return{
      iFlag:false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    backTop(){
      const that = this
      let timer = setInterval(()=>{
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
        if(that.scrollTop === 0){
            clearInterval(timer)
        }
      },16)
    },
    scrollToTop(){
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 350) {
        that.iFlag = true
      }else{
        that.iFlag = false
      }
    }
  }
}
</script>
<style scoped>
.go-top{
  position: fixed; top: 50%; right: 5px; background: #C0C4CC; color: #ffffff; z-index: 999;
  width: 30px; height: 30px; border-radius: 15px; text-align: center; line-height: 30px; 
  font-size: 18px; box-shadow: 0 1px 2px 0 #F2F6FC;
}
</style>
