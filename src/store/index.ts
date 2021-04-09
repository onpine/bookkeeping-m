import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/stroage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eyeState: getItem('eyeState') || false,
  },
  mutations: {
    setEyeState(state, value) {
      state.eyeState = value
      setItem('eyeState', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
