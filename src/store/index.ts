import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/stroage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eyeState: getItem('eyeState') || false,
    token: getItem('token') || undefined,
    user: getItem('user') || { uid: "" }
  },
  mutations: {
    setEyeState(state, value) {
      state.eyeState = value
      setItem('eyeState', value)
    },
    setTokenState(state, value) {
      state.token = value
      setItem('token', value)
    },
    setUserState(state, value) {
      state.user = { ...value }
      setItem('user', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
