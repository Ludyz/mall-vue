<template>
    <el-container>
    <el-header>
        <el-row>
            <el-col span="3" class="logo">mall后台管理系统</el-col>
            <el-col span="21">
                <!-- <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
                    <el-tab-pane
                        :key="item.name"
                        v-for="item in editableTabs"
                        :label="item.title"
                        :name="item.name"
                    >
                    </el-tab-pane>
                </el-tabs> -->
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="180px">
            <el-row class="tac">
                <el-col :span="24">
                <el-menu
                :default-active="$route.path"
                router
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1">用户列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>权限管理</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="/role/manage">角色列表</el-menu-item>
                    <el-menu-item index="2-2">权限列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-shopping-cart-1"></i>
                    <span>商品管理</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="/product/manage">商品列表</el-menu-item>
                    <el-menu-item index="/product/add">添加商品</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统管理</span>
                </el-menu-item>
                </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
    
</template>
<script>
import ProductMangage from '../views/product/ProductManage.vue'
export default {
    name:'System',
    components:{ProductMangage},
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
}
</script>

<style scoped>
.logo{
    width: 200px;
    text-align: center;
    font-weight: 500;
    font-size: 24px;
}
.el-tab{
   float: left; 
}
.el-header, .el-footer {

    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {

    color: #333;
    text-align: center;
    line-height: 200px;
    margin-top: 20px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>