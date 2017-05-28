<template>
    <div>
        <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
        <transition name="fade">
            <div v-show="!loading">
                <p>男生</p>
                <ul class="rank-type">
                    <li v-for="item in ranklist.male" v-if="!item.collapse" :key="item._id">
                        <RankItem :rankInfo="item"></RankItem>
                    </li>
                    <li class="other-rank" @click="showMoreMaleRank">
                        <span>
                            <Icon name="bar-chart"></Icon>
                            别人家的排行榜
                        </span>
                        <span class="angle">
                            <Icon v-if="maleOtherRankIsShow" name="angle-up"></Icon>
                            <Icon v-else name="angle-down"></Icon>
                        </span>
                    </li>
                    <ul v-show="maleOtherRankIsShow" class="rank-type">
                        <li v-for="item in ranklist.male" v-if="item.collapse" :key="item._id">
                            <RankItem :rankInfo="item"></RankItem>
                        </li>
                        </li>
                    </ul>
                </ul>
                <p>女生</p>
                <ul class="rank-type">
                    <li v-for="item in ranklist.female" v-if="!item.collapse" :key="item._id">
                        <RankItem :rankInfo="item"></RankItem>
                    </li>
                    <li class="other-rank" @click="showMoreFemaleRank">
                        <span>
                            <Icon name="bar-chart"></Icon>
                            别人家的排行榜
                        </span>
                        <span class="angle">
                            <Icon v-if="femaleOtherRankIsShow" name="angle-up"></Icon>
                            <Icon v-else name="angle-down"></Icon>
                        </span>
                    </li>
                    <ul v-show="femaleOtherRankIsShow" class="rank-type">
                        <li v-for="item in ranklist.female" v-if="item.collapse" :key="item._id">
                            <RankItem :rankInfo="item"></RankItem>
                        </li>
                    </ul>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import 'vue-awesome/icons/angle-up';
import 'vue-awesome/icons/bar-chart';
import 'vue-awesome/icons/angle-down';
import Icon from 'vue-awesome/components/Icon';
import RankItem from './RankItem';
import api from '../libs/api';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'Rank',
    components: {
        Icon, RankItem, PulseLoader
    },
    data() {
        return {
            ranklist: {},
            maleOtherRankIsShow: false,
            femaleOtherRankIsShow: false,
            loading: true,
            color: '#04b1ff',
            size: '10px',
            margin: '4px'
        }
    },
    created() {
        api.getRankType().then(response => {
            this.ranklist = response.data;
            this.loading = false;
        }).catch(err => {
            console.log(err)
        });
    },
    methods: {
        showMoreMaleRank() {
            this.maleOtherRankIsShow = !this.maleOtherRankIsShow;
        },
        showMoreFemaleRank() {
            this.femaleOtherRankIsShow = !this.femaleOtherRankIsShow;
        },
        changeHeadText() {
            this.$store.commit('setHeadText', '排行榜');
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

.fa-icon {
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
}

p {
    background-color: #f9f0f0;
    margin: 0;
    padding: 0.5rem 0 0.5rem 1rem;
}

.other-rank {
    justify-content: space-between;
}
</style>
