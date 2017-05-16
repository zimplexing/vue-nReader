<template>
    <div>
        <Topbar :showArrow="showArrow" preUrl="/rank"></Topbar>
        <ul class="rank-tab">
            <router-link tag="li" :to="rankId.weekRank" active-class="active" exact>周榜</router-link>
            <router-link tag="li" :to="rankId.monthRank" active-class="active" exact>月榜</router-link>
            <router-link tag="li" :to="rankId.totalRank" active-class="active" exact>总榜</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import Topbar from '@/components/Topbar';
export default {
    name: 'Ranklist',
    components: {
        Topbar
    },
    data() {
        return {
            msg: '排行榜',
            showArrow: true,
            rankId: null
        }
    },
    created() {
        this.rankId = {
            weekRank: "/ranklist/weekRank/" + this.$route.query.weekRank,
            monthRank: "/ranklist/monthRank/" + this.$route.query.monthRank,
            totalRank: "/ranklist/totalRank/" + this.$route.query.totalRank,
        }
    },
    mounted(){
        this.$router.push(this.rankId.weekRank);
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
    margin-top: 3rem;
    background: #fff;
}

.rank-tab {
    position: fixed;
    left: 0;
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
