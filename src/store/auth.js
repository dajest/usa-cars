/* eslint-disable */
import firebase from 'firebase/app'

export default {
  state: {
    user: null
  },

  getters: {
    getUser (state) {
      return state.user
    }
  },

  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },

    async logout() {
      await firebase.auth().signOut()
    }
  },

  mutations: {
    updateUser(state, payload) {
      state.user = payload
    }
  }
}
