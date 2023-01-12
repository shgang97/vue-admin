import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$api = api
store.commit('ADD_MENU', router);
function checkRouter(path) {
  return  router.getRoutes().some(route => route.path === path);
}
router.beforeEach((to, from, next) => {
  store.commit('GET_TOKEN')
  const token = store.state.token;
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (!checkRouter(to.path)) {
    next({name: 'home'})
  } else {
    next()
  }
})
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
