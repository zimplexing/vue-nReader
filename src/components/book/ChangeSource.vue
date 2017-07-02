<template>
	<div class="source-container">
		<mt-header fixed title="更换小说源">
			<router-link :to="/book/+$route.params.bookId" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<mt-radio class="source-radio" v-model="value" :options="source">
		</mt-radio>
	</div>
</template>
<script>
import api from '@/api/api'
import { Indicator } from 'mint-ui'
import { SET_CURRENT_SOURCE } from '@/store/mutationsType'

export default {
  name: 'changeSource',
  data () {
    return {
      source: [],
      value: ''
    }
  },
  watch: {
    'value': function () {
      this.$store.commit(SET_CURRENT_SOURCE, this.value)
    }
  },
  created () {
    Indicator.open()
    api.getMixSource(this.$route.params.bookId).then(response => {
      response.data.forEach((source) => {
        this.source.push({
          label: source.name,
          value: source._id
        })
      })
      this.value = this.$store.state.source
      Indicator.close()
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scope>
.source-container {
	width: 100vw;
}

.source-radio {
	margin-top: 2rem;
}
</style>
