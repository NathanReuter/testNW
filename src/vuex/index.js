/* The certification store implementation, it its constructed here in the index
* by simplicity, as the app grows, is preferable to use modules. */

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
    /* @param {string} type */
    setType (context, type) {
      context.commit('setType', type)
    },
    /* @param {string} type
     * Action that load all the certifications by its type, using the appService.
     * If is a success, the loadCertification event is called to update the certification value
     * The return is a promise */
    loadCertifications (context, type) {
      return appService.getCertifications(type).then(data => {
        context.commit('loadCertifications', { certifications: data, type: type })
      })
    },
    /* @param {object} certification
     * Action that add a certification by first checking if the certification in params is valid.
     * Than if is valid, it uses the appService to create the certification in server,
     * if it is a success(valid in the server too and store properly in the bank)
     * the addCertification event is called
     * The return is a promise */
    addCertification (context, certification) {
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
    /* @param {string} id
    *  Action that receives an id, and call appService do remove the certification from server.
    *  If it is a success, the removeCertification event is callled */
    removeCertification (context, id) {
      return appService.removeCertifications(id)
        .then(data => {
          context.commit('removeCertification', data)
        })
        .catch(err => {
          window.alert(err)
        })
    },
    /* @param {object} certification
     * Action that receives a certification object with the desired 'blacklisted' value of the certification.
     * The values are passed to the appService and if it is a success, then setBlackList is called */
    setBlackList (context, certification) {
      return appService.updateCertifications(certification.id, certification.updates)
        .then(data => {
          context.commit('setBlackList', data)
        })
    }
  },
  mutations: {
    /* @param {string} type */
    setType (state, type) {
      if (['cpf', 'cnpj'].includes(type)) {
        state.type = type
      }
    },
    /* @param {object} data */
    loadCertifications (state, data) {
      state.certifications = data.certifications
    },
    /* @param {object} certification */
    addCertification (state, certification) {
      state.certifications.push(certification)
    },
    /* @params {object} certification
     * Remove the certification by filtering all but the one that match the params id */
    removeCertification (state, certification) {
      state.certifications = state.certifications
        .filter(cert => cert._id !== certification._id)
    },
    /* @params {object} certification
     * Sets the current certification with the blacklisted value */
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
