<template>
    <el-row>
        <el-col :span="16">
            <h1 class="logo"><span style="line-height:60px;margin-left:15px">mall</span></h1>
        </el-col>
        <el-col  :span="8">
        <el-menu  :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        :router=true
        active-text-color="#ffd04b">
        <el-menu-item index="/">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">分类</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
        <el-menu-item :index="'/cart'">购物车</el-menu-item>
        <template v-if="!isLogin">
            <el-menu-item :index="'/login'" route="" >登录</el-menu-item>
            <el-menu-item :index="'/register'" route="" >注册</el-menu-item>
        </template>
        <template v-if="isLogin">
            <el-submenu index="4">
                <template slot="title">我的</template>
                <el-menu-item index="2-1">个人信息设置</el-menu-item>
                <el-menu-item @click="logout">退出登录</el-menu-item>
            </el-submenu>

        </template>
        

        
        </el-menu>
    </el-col>
</el-row>

    
</template>
<script>
export default {
    name:"Header",
    data() {
      return {
          user:{
              userId:'',
              userName:''

          },
          isLogin:false,   
          activeIndex: '/',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout:function(){
            const _this=this;
            _this.$axios.get('/logout',{
                headers:{
                    "authorization":_this.$store.getters.getToken
                }
            }).then(res=>{
                _this.$store.commit("REMOVE_INFO")
                _this.isLogin=false;
                //_this.$router.push("/")
            }).catch(err=>{
                console.log(err)
            })
      }
    },
    created(){
        const userName=this.$store.getters.getUser.userName;
        if(userName){
                this.user.userName=this.$store.getters.getUser.userName;
                this.user.userid=this.$store.getters.getUser.userid;
                this.isLogin=true;
        }
    }
}
</script>
<style scoped>
.logo{
    color: white;
    height: 60px;
    margin: 0px;
    background: #545c64;
}
</style>