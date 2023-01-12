import {createStore} from "vuex";

export default createStore({
  state: {
    isCollapse: true,
    currentMenu: null,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    menu: [],
    token: '',
  },
  mutations: {
    UPDATE_ISCOLLAPSE(state, payload) {
      state.isCollapse = !state.isCollapse
    },
    SELECT_MENU(state, val) {
      // state.currentMenu = val.name === 'home' ? null : val
      if (val.name === 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        let index = state.tabList.findIndex(item => item.name === val.name)
        index === -1 ? state.tabList.push(val) : ''
      }
    },
    CLOSE_TAB(state, val) {
      let index = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(index, 1)
    },
    SET_MENU(state, val) {
      state.menu = val;
      localStorage.setItem('menu', JSON.stringify(val));
    },
    ADD_MENU(state, router) {
      if (!localStorage.getItem('menu')) {
        return
      }
      const menu = JSON.parse(localStorage.getItem('menu'));
      state.menu = menu;
      const menuArray = [];
      menu.forEach(item => {
        if ( item.children) {
          item.children = item.children.map(item => {
            let url = `../views/${item.url}.vue`
            item.component = () => import(url);
            return item;
          });
          menuArray.push(...item.children)
        } else {
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menuArray.push(item);
        }
        menuArray.forEach(item => {
          router.addRoute('main', item);
        })
      })
    },
    CLEAN_MENU(state) {
      state.menu = [];
      localStorage.removeItem('menu');
    },
    SET_TOKEN(state, val) {
      state.token = val;
      sessionStorage.setItem('token', val);
    },
    CLEAN_TOKEN(state) {
      state.token = '';
      sessionStorage.removeItem('token');
    },
    GET_TOKEN(state) {
      state.token = state.token || sessionStorage.getItem('token');
    }
  }
})
