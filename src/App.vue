<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }

</script>

<style>
  body,
  ul,
  li {
    padding: 0;
    margin: 0;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
  
  li {
    list-style: none;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: 16px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
  .v-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
