<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'ReadBook',
  data() {
    return {
      msg: '书架'
    }
  },
  created(){
    this.$store.commit('setHeadText','书架');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
