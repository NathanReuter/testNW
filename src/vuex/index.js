import Vue from 'vue'
import Vuex from 'vuex'
import Validator from '../validators'
import appService from '../app.service'

Vue.use(Vuex)

const state = {
  type: '',
  certifications: []
}

const store = new Vuex.Store({
  state,
  getters: {
    type: state => state.type,
    certifications: state => state.certifications
  },
  actions: {
    setType (context, type) {
      context.commit('setType', type)
    },
    loadCertifications (context, type) {
      return appService.getCertifications(type).then(data => {
        context.commit('loadCertifications', { certifications: data, type: type })
      })
    },
    addCertification (context, certification) {
      /* Check if certification pattern is correct by its type and also check if it
      * doesn't exists before adding to the server */
      return new Promise((resolve, reject) => {
        if (!Validator.validateCertification(certification.value, certification.type) ||
          state.certifications.find(cert => cert.value === certification.value)) {
          return reject(new Error(`${certification.type} Inválido ou já existente`))
        }

        appService.createCertifications(certification).then(data => {
          resolve(context.commit('addCertification', data))
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeCertification (context, id) {
      return appService.removeCertifications(id)
        .then(data => {
          context.commit('removeCertification', data)
        })
        .catch(err => {
          window.alert(err)
        })
    },
    setBlackList (context, certification) {
      return appService.updateCertifications(certification.id, certification.updates)
        .then(data => {
          context.commit('setBlackList', data)
        })
    }
  },
  mutations: {
    setType (state, type) {
      if (['cpf', 'cnpj'].includes(type)) {
        state.type = type
      }
    },
    loadCertifications (state, data) {
      state.certifications = data.certifications
    },
    addCertification (state, certification) {
      state.certifications.push(certification)
    },
    removeCertification (state, certification) {
      state.certifications = state.certifications
        .filter(cert => cert._id !== certification._id)
    },
    setBlackList (state, certification) {
      state.certifications = state.certifications
        .map(cert => {
          if (cert._id === certification._id) {
            cert.blacklisted = !cert.blacklisted
          }

          return cert
        })
    }
  }
})

export default store
