<template>
  <div>
  <el-collapse-transition>
  <el-menu class="header" v-if="showHeader" >
    <div class="header-content" :style="{width:'1400px'}">
    <!--logo-->
    <div class="logo">
      <img src="src\assets\images\logo.png" alt="hh">
    </div>
    <!--菜单栏-->
    <div class="menu-panel">
      menu
    </div>
    <!--用户登陆注册-->
    <div class="user-info-panel">
      <el-button color="#f6d365" type="primary" class="op-btn">
        发帖<span class="iconfont icon-add"></span>
      </el-button>
      <el-button color="#f6d365" type="primary" class="op-btn">
        搜索<span class="iconfont icon-search"></span>
      </el-button>
      <el-button-group style="margin-left: 10px;">
      <el-button color="#f6d365" type="primary" @click="logAReg(1)">登录</el-button>
      <el-button color="#f6d365" type="primary" @click="logAReg(0)" >注册</el-button>
      </el-button-group>
    </div>
    </div>
  </el-menu>
</el-collapse-transition>
  <Dialog :centerDialogVisible="show"  :buttons="buttons"  @close="show=false"><div>内容</div></Dialog>

  <div style="height:1000px">
    <Router-View/>
  </div>

  <!--登陆注册-->
  <loginAndRegister ref="logARegRef"></loginAndRegister>


  </div>
</template>

<script setup>

import loginAndRegister from "./LoginAndRegister.vue";
import {ref,reactive,getCurrentInstance,onMounted} from "vue";
import { useRouter,useRoute } from "vue-router";


//es6对象的解构赋值(以后调用proxy就相当于getCurrentInstance.proxy()了)
const {proxy}=getCurrentInstance();
const router=useRouter();
const route=useRoute();


const showHeader=ref(true);
//获取滚动条高度
const getScrollTop=()=>{
  //考虑浏览器兼容问题
  let scrollTop=document.documentElement.scrollTop||
  window.pageYOffset||
  document.body.scrollTop;
  return scrollTop;
};

//监听滚动
const initScroll=()=>{
  //初始位置
  let initScrollTop=getScrollTop();
  //滚动方向标识
  let scrollType=0;

  window.addEventListener("scroll",()=>{
    //当前位置
    let currentScrollTop=getScrollTop();
    if(currentScrollTop>initScrollTop){
      //向上滚
      scrollType=0;
    }else{
      //向下滚
      scrollType=1;
    }
    initScrollTop=currentScrollTop;
    console.log(scrollType==1? "up":"down")
    if(scrollType==0&&currentScrollTop>=200){
      showHeader.value=false;
    }else{
      showHeader.value=true;
    }
  });
};


onMounted(() => {
  initScroll();
});

//登陆注册
const logARegRef=ref();
const logAReg=(type)=>{
  logARegRef.value.showPanel(type);
}


</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 6px 0 grey;
    .header-content{
      margin: 0px auto;
      align-items: center;
      height: 60px;
      //弹性盒子flex-box
      display: flex;
      align-items: center;
    }
}
.logo{
  float: left;
  display: block;

}
.menu-panel{
  flex:1;
}
.user-info-panel{
  width:310px;
  float: right;
  display: flex;
.op-btn{
    display:block;
    margin-left: 5px;
  }
}
</style>
