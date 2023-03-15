import { createApp } from 'vue'
import App from './App.vue'

//引入router
import router from './router'

//引入cookies
import VueCookies from 'vue-cookies'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// collapse
import { ElCollapseTransition } from 'element-plus'

//我们使用sass 所以这里将base.css 改成base.scss
import '@/assets/base.scss'

//图标 图标在附件中
import '@/assets/icon/iconfont.css'
import './assets/base.scss'

//全局方法
import Verify  from './utils/Verify'
import Message from './utils/Message'
import Request from './utils/Request'
//全局组件
import Dialog from "@/components/Dialog.vue"

//创建并挂载根实例
const app = createApp(App)
//确保 _use_ 路由实例使整个应用支持路由。
app.use(router)

app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;

app.config.globalProperties.globalInfo={
    bodywidth:1300,
}
app.config.globalProperties.Verify=Verify;
app.config.globalProperties.Message=Message;
app.config.globalProperties.Request=Request;

app.component(ElCollapseTransition.name, ElCollapseTransition)
app.component("Dialog",Dialog);

app.mount('#app')
