<template>
	<div>
		<mt-header fixed :title="headTitle">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<ul class="rank-tab">
			<router-link tag="li" to="/ranklist/weekRank" active-class="active" exact>周榜</router-link>
			<router-link tag="li" to="/ranklist/monthRank" active-class="active" exact>月榜</router-link>
			<router-link tag="li" to="/ranklist/totalRank" active-class="active" exact>总榜</router-link>
		</ul>
		<router-view></router-view>
	</div>
</template>


<script>
import { SET_BACK_POSITION } from '@/store/mutationsType'

export default {
  name: 'Ranklist',
  data () {
    return {
    }
  },
  computed: {
    headTitle () {
      return this.$store.state.headTitle
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit(SET_BACK_POSITION, '排行')
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100vw;
	background: #fff;
}

.rank-tab {
	position: fixed;
	top: 2rem;
	left: 0;
	z-index: 10;
	border-bottom: 1px solid #ccc;
}

li {
	text-align: center;
	line-height: 2.5rem;
	width: 33.3%;
}

.active {
	border-bottom: 2px #04b1ff solid;
}
</style>
