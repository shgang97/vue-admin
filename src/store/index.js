import {createStore} from "vuex";

export default createStore({
  state: {
    isCollapse: true
  },
  mutations: {
    UPDATE_ISCOLLAPSE(state, payload) {
      state.isCollapse = !state.isCollapse
    }
  }
})
