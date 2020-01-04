<template>
    <div class="home">
        <v-head ></v-head>
        <v-LeftMenu ></v-LeftMenu>
        <div class="content-box" :class="{'content-collapse':isCollapse}">
            <div class="tabs">
                <v-Tabs></v-Tabs>
            </div>

            <div class="content">
                <transition  name="move" mode="out-in" appear>
                    <keep-alive >
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
 </div>

</template>

<script>
import bus from '../../common/bus';
import vHead from './Header.vue';
import vLeftMenu from './LeftMenu.vue';
import vTabs from './Tabs.vue';
export default {
    data() {
        return {
            isCollapse:false,
            tabsList:[]
        }

    },
    components: {
        vHead,
        vLeftMenu,
        vTabs
    },
    created() {
        bus.$on('menuIsCollapse', msg => {
            this.isCollapse = msg;
        });
        bus.$on('tabs', tabs=>{
            let arr = [];
            for (let i = 0, len = tabs.length; i < len; i++) {
                tabs[i].name && arr.push(tabs[i].name);
            }
            this.tabsList = arr;

        });
    }
}
</script>

<style scoped>
.content-box{
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}
.content-collapse{
    left: 70px;
}
.home{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.content{
    padding: 12px;
}
.content .content-detail{
    background: #fff;
}
.content-box .tabs{
    width: 100%;
    height: 30px;
    background: #fff;
    border-radius: 10px;
    margin: 5px 0;
    padding: 0 5px;
}
</style>