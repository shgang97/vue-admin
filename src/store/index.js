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
    ]
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
    }
  }
})
