/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    carAdvs : [],
    currentAdvId: null,
    currentAdv: []
  },

  actions: {
    async createAdv ({commit, dispatch}, payload) {
      let carAdv = await firebase.database().ref('/cars').push(payload)
      firebase.database().ref(`/cars/${carAdv.key}`).set({
        ...payload,
        carAdvId: carAdv.key
      })
      commit('setCurrentAdvId', carAdv.key)
      commit('setCurrentAdv', {
        ...payload,
        carAdvId: carAdv.key})
      dispatch('getAllAdvs')
    },

    async getAllAdvs ({commit}) {
      let carList = (await firebase.database().ref('/cars').once('value')).val()
      let freshCarList = []
      if(carList) {
        Object.keys(carList).forEach(function(key) {
          freshCarList.push({ ...carList[key]})
        })
        commit('addAdvsToState', freshCarList)
      }
    }
  },

  getters: {
    advList (state) {
      return state.carAdvs
    },
    currentAdvId (state) {
      return state.currentAdvId
    },
    currentAdv (state) {
      return state.currentAdv
    },
  },

  mutations: {
    addAdvsToState(state, payload) {
      state.carAdvs = payload
    },

    setCurrentAdvId(state, payload) {
      state.currentAdvId = payload
    },

    setCurrentAdv(state, payload) {
      state.currentAdv = payload
    }
  }
}
