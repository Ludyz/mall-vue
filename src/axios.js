import axios from "axios";
import Element from "element-ui"
import router from './router'
import store from './store'


axios.defaults.baseURL="http://localhost:8082";//配置默认url地址
//请求拦截
axios.interceptors.request.use(config=>{
    let token=window.localStorage.getItem("token");
    if(token){
        config.headers["authorization"] = token;
    }
    return config;

})

//响应拦截
axios.interceptors.response.use(response=>{
    let res=response.data;
    if(res.code===200){
        return response;
    }else{
        Element.Message.error(res.msg);
        return Promise.reject(response.data.message);
    }
},
error=>{
    
    if(error.response.data){
        error.message=error.response.data.msg;
    }
    if(error.response.status===401){//认证失败
        store.commit("REMOVE_INFO")
        router.push("/login")
    }
    if(error.response.status===403){//认证失败
        error.message=error.response.data.msg;
    }
    Element.Message.error(error.message)
    return Promise.reject(error);
}
)
