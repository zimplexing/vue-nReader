<template>
	<div>
		<mt-tab-container v-model="selected" :swipeable="false" :value="selected">
			<mt-tab-container-item id="书架">
				<mt-header fixed :title="selected"></mt-header>
				<Bookshelf class="tab-container" @addBook="changeSelected"></Bookshelf>
			</mt-tab-container-item>
			<mt-tab-container-item id="分类">
				<mt-header fixed :title="selected"></mt-header>
				<keep-alive include="Bookshelf">
					<Bookcategory class="tab-container"></Bookcategory>
				</keep-alive>
			</mt-tab-container-item>
			<mt-tab-container-item id="排行">
				<mt-header fixed :title="selected"></mt-header>
				<keep-alive include="Rank">
					<Ranklist class="tab-container"></Ranklist>
				</keep-alive>
			</mt-tab-container-item>
			<mt-tab-container-item id="搜索">
				<Search></Search>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-tabbar v-model="selected" :fixed="true" :value="selected">
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
				<img slot="icon" src="../assets/search.svg">搜索
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
import Bookshelf from './bookshelf/Bookshelf'
import Bookcategory from './category/Bookcategory'
import Ranklist from './ranklist/Rank'
import Search from './search/Search'

export default {
  name: 'home',
  components: {
    Bookshelf,
    Bookcategory,
    Ranklist,
    Search
  },
  data () {
    return {
      selected: '书架'
    }
  },
  methods: {
    changeSelected (data) {
      this.selected = data
    }
  },
  mounted () {
    this.selected = this.$store.state.previousPosition
  }
}
</script>

<style scoped>
.tab-container {
	box-sizing: border-box;
	padding-top: 2rem;
	padding-bottom: 55px;
	width: 100vw;
	min-height: 100vh;
}
</style>
