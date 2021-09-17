<template>
    <el-carousel indicator-position="outside" height="500px">
    <el-carousel-item v-for="item in products" :key="item.proid">
    <router-link v-bind:to="'/product/'+item.proid+'/detail'"><h3><img class="img" v-bind:src="'http://localhost:8082/productPicture/'+item.mainimage"></h3></router-link>
    </el-carousel-item>
    </el-carousel>
    
</template>
<script>
export default {
    name:'Banner',
    data(){
        return{
            products:{},
            pageNo:'1',
            total:'',
            pageSize:'4'
        }
    },
    created(){
        let _this=this;
        this.$axios.get("/product/selProductPage?pageNo="+this.pageNo+"&pageSize="+this.pageSize).then(res=>{
           
            _this.products=res.data.data.records;
            _this.pageNo=res.data.data.current;
            _this.total=res.data.data.total;
            _this.pageSize=res.data.data.size;
            
        })
    }
    
}
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
.img{
    width: 100%;

}
</style>