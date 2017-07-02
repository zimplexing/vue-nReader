<template>
	<div>
		<section v-for="(item ,key, index) in category" :key="index">
			<p class="category-type">{{categoryType[key]}}</p>
			<ul>
				<li v-for="(cat, index) in item" :key="index" @click="$router.push({path:'/bookcat/detail',query:{gender:key,major:cat.name}})">
					<p class="category">{{cat.name}}</p>
					<span class="book-count">{{cat.bookCount}}</span>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
import api from '@/api/api'

export default {
  name: 'Booklcat',
  data () {
    return {
      category: null,
      categoryType: {
        male: '男生',
        female: '女生',
        press: '出版'
      }
    }
  },
  created () {
    api.getCategory().then(response => {
      this.category = response.data
      this.loading = false
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 1rem;
	margin-right: 1rem;
}

li {
	width: 33.3%;
	text-align: center
}

.category {
	font-weight: bold;
	font-size: 0.8rem;
	margin-bottom: 0.1rem;
	margin-top: 0.8rem;
	line-height: 1.3rem;
}

.category-type {
	line-height: 2rem;
	margin-top: 0;
	margin-bottom: 0;
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: 1px solid #f3eded;
}

.book-count {
	color: #959595;
}
</style>
