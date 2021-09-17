<template>
<div class="container">
    <div class="good-list"><span style="">&nbsp;&nbsp;商品列表</span></div>
    <el-row v-for="(row,index) in goods" :key="index">
        <el-col :span="6" v-for="(item) in row" :key="item.proid">
            <router-link v-bind:to="'/product/'+item.proid+'/detail'">
            <div class="good-item">
                <div class="good-img">
                    <img class="img" @error="defImg()" :src="'http://localhost:8082/productPicture/'+item.mainimage">
                </div>
                <div class="good-name">
                    {{item.name}}
                </div>
                <div class="good-subtitle">
                   {{item.subtitle}}
                </div>
                <div class="good-price">
                    <span style="color:red;font-size:20px">{{item.price}}￥</span>
                </div>
            </div>
            </router-link>
        </el-col>
    </el-row>
    <el-pagination class="page"
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="page.currentPage"
        :page-size="page.size"
        :total="page.total">
    </el-pagination>
</div>
</template>

<script>
export default {
    name:'Goods',
    data(){
        return{
            page:{
                currentPage:1,//当前页
                size:12,//一页的数量
                products:[],//商品
                total:0,//总条数
                sizes:0,//总页数
                pages:0
            },
            goods:[],
            defaultImg:"http://localhost:8082/productPicture/b3fc9cc6252e378cd0dfd83bcca3106e.gif"
        }
    },
    computed:{
         pages () {
             
            const pages = []
            this.page.products.forEach((item, index) => {
                const page = Math.floor(index / 4)//4代表4条为一行，随意更改
                if (!pages[page]) {
                pages[page] = []
            }
            pages[page].push(item)
            })
            return pages
        }
    },
    methods:{
        changePage(currentPage){
            
            let _this=this;
            this.$axios.get("/product/selProductPage?pageNo="+currentPage+"&pageSize="+this.page.size).then(res=>{
            
            _this.page.products=res.data.data.records;
            _this.page.currentPage=res.data.data.current;
            _this.page.total=res.data.data.total;
            _this.page.size=res.data.data.size;
            _this.page.pages=res.data.data.pages;
           
            _this.goods=this.pages;
            })
        },
        defImg(){
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        }
    },
    created(){
       this.changePage(1);
    }
}
</script>

<style scoped>
.container{
    border: 1px #E4E7ED solid;
    border-radius: 5px;
}
.good-list{
    height: 50px;
    background: #ececec;
    line-height:50px;
    font-weight: 600;
    font-size: 20px;

}

.good-item{
    height: 430px;
    border:1px #E4E7ED solid; 
    
}
.good-item:hover{
    box-shadow: 0px 0px 20px  #313030;
}
.good-img{
    text-align: center;
}
.img{
    width: 80% ;
    height: 258px;
    max-height: 80%;
    
    margin: 20px auto;
}
.good-name{
    text-align: center;
    padding: 2px 0;
    margin: 0px 4px;
    font-weight: 400;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
}
.good-subtitle{
    color: rgb(139, 138, 136);
    font-size: 10px;
    text-align: left;
    padding: 0 3px;
    margin: 0px 4px;
   
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
}
.good-price{
    text-align: center;
    padding: 2px 0;
}
.page{
    text-align: center;
    margin:30px 0;
}

.router-link-active{
text-decoration: none;
}
a {
  text-decoration: none;
}
</style>