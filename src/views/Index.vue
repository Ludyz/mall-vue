<template>

    <el-container>
        <el-header>
            <!-- <h1 class="logo"><span style="line-height:60px;margin-left:15px">mall</span></h1> -->
            <Header></Header>
        </el-header>
        <el-main>
            <div class="banner"><Banner></Banner></div>
            <Goods></Goods>
        </el-main>
    </el-container>
    
</template>
<script>
import Header from "../components/Header.vue";
import Banner from "../components/Banner.vue";
import Goods from "../components/Goods.vue";
export default {
    name:"Index",
    components:{Header,Banner,Goods}
    
}
</script>
<style scoped>


</style>