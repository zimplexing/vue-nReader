<template>
  <div>
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
    <transition-group name="fade">
      <section v-for="(item ,key, index) in category" :key="index">
        <p class="category-type">{{categoryType[key]}}</p>
        <ul>
          <!--todo 每一个标签都绑定一个事件，不知道会不会对性能有所影响-->
          <li v-for="(cat, index) in item" :key="index" @click="$router.push({path:'/bookcat/detail',query:{gender:key,major:cat.name}})">
            <p class="category">{{cat.name}}</p>
            <span class="book-count">{{cat.bookCount}}</span>
          </li>
        </ul>
      </section>
    </transition-group>
  </div>
</template>
<script>
import api from '../libs/api';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'Booklcat',
  components: {
    PulseLoader
  },
  data() {
    return {
      category: null,
      categoryType: {
        male: '男生',
        female: '女生',
        press: '出版'
      },
      loading: true,
      color: '#04b1ff',
      size: '10px',
      margin: '4px'
    }
  },
  created() {
    api.getCategory().then(response => {
      this.category = response.data;
      this.loading = false;
    }).catch(err => {
      conosle.log(err)
    })
  },
  watch: {
    '$route': 'changeHeadText'
  },
  methods: {
    changeHeadText() {
      this.$store.commit('setHeadText', '分类');
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.changeHeadText();
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
  font-size: 1rem;
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
