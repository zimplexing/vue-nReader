<template>
    <div @click="showRankList" class="rank-item">
        <img v-bind:src="staticPath + rankInfo.cover" />
        <router-link to="#">{{rankInfo.title}}</router-link>
    </div>
</template>

<script>
export default {
    name: 'RankItem',
    data() {
        return {
            staticPath: 'http://statics.zhuishushenqi.com/'
        }
    },
    props: ['rankInfo'],
    methods: {
        showRankList() {
            //设置全局store
            this.$store.commit('setRankId',this.rankInfo);
            this.$router.push({ path: '/ranklist'});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rank-type {
    display: flex;
    flex-direction: column;
}

li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
    line-height: 3rem;
    margin-left: 1rem;
    margin-right: 1rem;
    border-bottom: 0.01rem solid #f3f3f3;
}

.rank-type img {
    width: 1.2rem;
    margin-right: 0.5rem;
}

.other-rank {
    justify-content: space-between;
}

.rank-item {
    width: 100%;
}
.rank-item  a{
    color: #000;
}
</style>
