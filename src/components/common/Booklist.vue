<template>
	<li @click="getBook()">
		<img :src="imgUrl">
		<div class="book-info">
			<p class="book-title">{{book.title}}</p>
			<p class="book-author">{{book.author}} | {{book.cat}}</p>
			<p class="short-intro">{{book.shortIntro}}</p>
			<p class="reader-info">{{latelyFollower}}万人气 | {{book.retentionRatio}}%读者留存</p>
		</div>
	</li>
</template>

<script>
import util from '@/utils/util'
export default {
  name: 'Bookslist',
  data () {
    return {

    }
  },
  props: ['book'],
  computed: {
    latelyFollower () {
      return (this.book.latelyFollower / 10000).toFixed(1)
    },
    imgUrl () {
      return util.staticPath + this.book.cover
    }
  },
  methods: {
    getBook () {
      // 只记录从不是搜索结果中进入书本详情的路径，不然会出现死循环
      // if(this.$route.path.indexOf('/search') === -1){
      //     this.$store.commit('setPrePath', this.$route.fullPath);
      // } 
      this.$router.push('/book/' + this.book._id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
	width: 4rem;
	height: 5rem;
	float: left;
	margin-right: 0.4rem;
}

li {
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: 1px solid #e6dbdb;
	padding-bottom: 0.2rem;
	padding-top: 0.2rem;
}

li:active,
li:focus {
	background: #f2f2f2;
}

.book-info {
	box-sizing: border-box;
	width: 100%;
	height: 5rem;
	padding-left: 5rem;
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
}

.book-title {
	font-weight: bold;
}

.short-intro {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #655555;
}

.book-author {
	color: #655555;
}

.book-info p {
	margin-top: 0;
	margin-bottom: 0;
	font-size: 0.7rem;
	line-height: 1.2rem;
}
</style>
