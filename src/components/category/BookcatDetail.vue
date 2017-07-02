<template>
	<div>
		<mt-header fixed :title="major">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="select">
			<ul class="select-bar">
				<v-touch tag="li" v-for="(item, index) in types" :class="{'active': index === majorSelected}" :key="index" @tap="setType(item.type,index)">{{item.name}}</v-touch>
			</ul>
			<ul class="select-bar" v-if="mins">
				<li data-type="hot">全部</li>
				<v-touch tag="li" :class="{'active': index === minorSelected}" v-for="(minor, index) in mins" :key="index" @tap="setMinor(minor,index)">{{minor}}</v-touch>
			</ul>
		</div>
		<mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
			<ul class="book-list">
				<Booklist v-for="book in books" :book="book" :key="book._id"></Booklist>
			</ul>
		</mt-loadmore>
	</div>
</template>
<script>
import api from '@/api/api'
import Booklist from '@/components/common/Booklist'
import { SET_BACK_POSITION } from '@/store/mutationsType'
import { Indicator } from 'mint-ui'

export default {
  name: 'BookcatDetail',
  components: {
    Booklist
  },
  data () {
    return {
      books: null,
      type: 'hot',
      gender: '',
      major: '',
      minor: '',
      mins: null,
      majorSelected: 0,
      minorSelected: 0,
      currentPage: 1,
      allLoaded: false,
      types: [{
        type: 'hot',
        name: '热门'
      }, {
        type: 'new',
        name: '新书'
      }, {
        type: 'reputation',
        name: '好评'
      }, {
        type: 'over',
        name: '完结'
      }, {
        type: 'monthly',
        name: '包月'
      }]
    }
  },

  methods: {
    /**
         * 根据筛选分类获取结果
         */
    // todo 入参需要优化
    getNovelListByCat (gender, type, major, minor) {
      Indicator.open('加载中')
      api.getNovelListByCat(gender, type, major, minor).then(response => {
        Indicator.close()
        this.books = response.data.books
      }).catch(err => {
        console.log(err)
      })
    },

    /**
         * 选择大类分类
         */
    setType (type, index) {
      this.majorSelected = index
      this.type = type
      this.getNovelListByCat(this.gender, this.type, this.major, this.minor)
    },

    /**
         * 选择子类分类
         */
    setMinor (minor, index) {
      this.minorSelected = index
      this.minor = minor
      this.getNovelListByCat(this.gender, this.type, this.major, this.minor)
    },

    /**
         * 下拉刷新 
         */
    loadTop () {
      // 加载更多数据
      this.getNovelListByCat(this.gender, this.type, this.major, this.minor)
      this.$refs.loadmore.onTopLoaded()
    },

    /**
         * 加载更多
         */
    loadBottom () {
      // 加载更多数据
      let that = this
      Indicator.open('加载中')
      api.getNovelListByCat(this.gender, this.type, this.major, this.minor, this.currentPage * 20).then(response => {
        that.books = [...that.books, ...response.data.books]
        that.currentPage++
        Indicator.close()
      }).catch(err => {
        console.log(err)
      })
      this.$refs.loadmore.onBottomLoaded()
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.major = vm.$route.query.major
      vm.gender = vm.$route.query.gender
      /**
             * 获取大分类中的小类别
             */
      api.getCategoryDetail().then(response => {
        response.data[vm.$route.query.gender].forEach((type) => {
          if (type.major === vm.$route.query.major) {
            vm.mins = type.mins
          }
        })
      }).catch(err => {
        console.log(err)
      })
      vm.getNovelListByCat(vm.$route.query.gender, vm.type, vm.$route.query.major)
      vm.$store.commit(SET_BACK_POSITION, '分类')
    })
  }
}
</script>
<style scoped>
.select {
	position: fixed;
	top: 2rem;
	left: 0;
	background: #fff;
	z-index: 10;
}

.select-bar {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: nowrap;
	height: 2rem;
	width: 100vw;
	overflow-x: auto;
	overflow-y: hidden;
	border-bottom: 1px solid #f2f2f2;
}

.select-bar li {
	flex-shrink: 0;
	line-height: 2rem;
	padding-left: 0.6rem;
	padding-right: 0.6rem;
	font-size: 0.7rem;
}

.active {
	color: red;
}

.book-list {
	width: 100vw;
	background: #f2f2f2;
}

.loadmore {
	margin-top: 6rem;
}

.active {
	color: #26a2ff;
}
</style>
