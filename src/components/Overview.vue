<template>
  <div id="home">
    <Topbar :showArrow="showArrow" :headText="headText" :showFun="showFun"></Topbar>
    <transition name="fade">
      <keep-alive>
        <router-view id="container"></router-view>
      </keep-alive>
    </transition>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar';
import Topbar from '@/components/Topbar';

export default {
  name: 'home',
  components: {
    Tabbar,
    Topbar
  },
  data() {
    return {
      showArrow: false,
      showFun: true
    }
  },
  computed:{
    headText(){
      return this.$store.state.headText;
    }
  }
}
</script>

<style scoped>
#container {
  box-sizing: border-box;
  margin-top: 3rem;
  width: 100vw;
  margin-bottom: 54px;
}
</style>
