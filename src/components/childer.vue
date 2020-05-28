<template>
  <div class="hello">
    <button @click="jiaa">+</button>  <button @click="jiana">-</button>
    <h1>子组件:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'childer',
  props: [ 'msg' ],
  data () {
    return {
      msg: this.msg
    }
  },
  methods: {
    jiaa () {
      this.$emit('jiac')
    },
    jiana () {
      this.$emit('jianc')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
