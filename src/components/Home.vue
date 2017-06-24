<template>
    <div>
        <mt-header fixed :title="selected"></mt-header>
        <mt-tab-container class="tab-container" v-model="selected" :swipeable="false" :value="selected">
            <mt-tab-container-item id="书架">
                <Bookshelf></Bookshelf>
            </mt-tab-container-item>
            <mt-tab-container-item id="分类">
                <Bookcategory></Bookcategory>
            </mt-tab-container-item>
            <mt-tab-container-item id="排行">
                <Ranklist></Ranklist>
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
                <img slot="icon" src="../assets/search.svg">
                <router-link to="/search" exact>
                    搜索
                </router-link>
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
        Bookshelf, Bookcategory, Ranklist, Search
    },
    data() {
        return {
            selected: '书架',
        }
    },
    mounted() {
        this.selected = this.$store.state.previousPosition;
    }
}
</script>

<style scoped>
.tab-container {
    box-sizing: border-box;
    padding-top: 2rem;
    padding-bottom: 55px;
    width: 100vw;
}
</style>
