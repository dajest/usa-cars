/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    carAdvs : []
  },

  actions: {
    async createAdv ({commit}, payload) {
      let carAdv = await firebase.database().ref('/cars').push( payload )
      let Adv = {...payload, id: carAdv.key}
      commit('addAdvToState', Adv)
      return Adv
    },

    async getAdvs ({commit}) {
      let carList = (await firebase.database().ref('/cars').once('value')).val()
      let freshCarList = []
      Object.keys(carList).forEach(function(key) {
        freshCarList.push({ ...carList[key], id: key })
      })

      commit('setAdvState', freshCarList)
      return freshCarList
    }
  },

  getters: {
    getCarList (state) {
      return state.carAdvs
    }
  },

  mutations: {
    setAdvState(state, payload) {
      state.carAdvs = payload
    },

    addAdvToState(state, payload) {
      state.carAdvs.push(payload)
    }
  }
}
