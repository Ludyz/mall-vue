import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Index from '../views/Index'
import Register from '../views/Register'
import ProductEdit from '../views/product/ProductEdit'
import ProductManage from '../views/product/ProductManage'
import ProductDetail from '../views/product/ProductDetail'
import Cart from '../views/Cart'
import System from '../views/System'
import RoleManage from '../components/authority/RoleManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/',
      name:'Index',
      component:Index
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/product/:proId/detail',
      name:'ProductDetail',
      component:ProductDetail
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/system',
      name:'System',
      component:System,
      children:[
        {
          path:'/product/manage',
          name:'ProductManage',
          component:ProductManage
        },
        {
          path:'/product/add',
          name:'ProductAdd',
          component:ProductEdit
        },
        {
          path:'/product/:proId/edit',
          name:'ProductEdit',
          component:ProductEdit
        },
        {
          path:'/role/manage',
          name:'RoleManage',
          component:RoleManage
        },
      ]
    }

  ]
})
