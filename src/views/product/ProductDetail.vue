<template>

    <div class="container">
        <Header></Header>
        <div class="detail">&nbsp;&nbsp;商品详情</div>
        <div class="gray_box">
            <div class="gallery-wrapper">
                <img class="mainimg" v-bind:src="'http://localhost:8082/productPicture/'+product.mainimageUrl">
            </div>
            <div class="banner">
                <div class="name">
                    <h2>{{product.name}}</h2>
                </div>
                <el-divider></el-divider>
                <div class="title">
                    {{product.subtitle}}
                </div>
                <el-divider></el-divider>
                <div class="description">
                    {{product.detail}}
                </div>
                <el-divider></el-divider>
                <div class="price">
                    <span>价格：<span style="font-size:20px;color:red">{{product.price}}￥</span></span>
                </div>
                <el-divider></el-divider>
                <div class="num">
                    <span>数量：</span>
                    <el-input-number v-model="num"  :min="1" label="描述文字"></el-input-number>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-button @click="addcart" type="primary">加入购物车</el-button>
                    <el-button >现在购买</el-button>
                </div>
                
                
            </div>
        </div>
    </div>
    
</template>
<script>
import Header from '../../components/Header.vue';
export default {
    name:'ProductDetail',
    components:{Header},
    data(){
        return{
            product:{
                proid:'',
                name: 'test',
                cateid: '1',
                subtitle: 'test',
                mainimageUrl: '',
                subimageUrl: '',
                detail: 'test',
                price: 1.00
            },
            num:1,
            userid:''
        }
    },
    methods:{
        addcart(){
            const userid=this.$store.getters.getUser.userid;
            if(userid){
                this.userid=userid;
            }
            const _this=this;
            this.$axios.post("/cart/insProToCart",
            {"proid":_this.product.proid,
            "userid":_this.userid,
            "quantity":_this.num}).then(res=>{
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                    });
                })
        }

    },
    created(){
        const proId=this.$route.params.proId;
        if(proId){
            const _this=this;
            this.$axios.get("/product/selProductById/"+proId).then(res=>{
                const product=res.data.data;
                _this.product.proid=product.proid;
                _this.product.cateid=product.cateid;
                _this.product.name=product.name;
                _this.product.subtitle=product.subtitle;
                _this.product.mainimageUrl=product.mainimage;
                _this.product.subimageUrl=product.subimages;
                _this.product.price=product.price;
                // _this.form.stock=product.stock;
                // _this.form.status=product.status;
        })
      }
        
    }
}
</script>
<style scoped>
.container{
    border-bottom: 1px #E4E7ED solid;
    border-radius: 5px;
}

.detail{
    margin-top: 20px;
    height: 50px;
    background: #ececec;
    line-height:50px;
    font-weight: 600;
    font-size: 20px;

}
.gallery-wrapper{
    width: 35%;
    height: 450px;
    float: left;
    margin: 60px 60px 60px 60px ;
}
.banner{
    width:45%;
    height: 450px;

    float: left;
    margin: 60px 60px 60px 60px ;
}
.mainimg{
    max-width: 380px;
}
.name{
    margin: 10px 10px;
}
.title{
    margin: 10px 10px;
}
.description{
    margin: 10px 10px;
    color: #666666;
}
.num{
    margin: 10px 10px;
}
.buy{
    margin: 10px 10px;
}
.price{
    margin: 10px 10px;
}

</style>