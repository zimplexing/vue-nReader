<template>
  <div>
    <mt-header fixed :title="selectTab"></mt-header>
     <mt-tab-container v-model="active" :swipeable="true" :value="selectTab" id="container">
      <mt-tab-container-item id="书架">
        <mt-cell v-for="n in 10" title="tab-container 1" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="分类">
        <mt-cell v-for="n in 5" title="tab-container 2" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="排行">
        <mt-cell v-for="n in 7" title="tab-container 3" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="搜索">
        <mt-cell v-for="n in 7" title="tab-container 3" :key="n"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="书架">
        <img slot="icon" src="../assets/book.svg"> 书架
      </mt-tab-item>
      <mt-tab-item id="分类">
        <img slot="icon" src="../assets/category.svg"> 分类
      </mt-tab-item>
      <mt-tab-item id="排行">
        <img slot="icon" src="../assets/rank.svg"> 排行
      </mt-tab-item>
      <mt-tab-item id="搜索">
        <img slot="icon" src="../assets/search.svg"> 搜索
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      selectTab: '',
      selected: '书架',
      active: '书架'
    }
  },
  computed: {
    headText() {
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
