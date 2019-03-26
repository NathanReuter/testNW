/* This module export a service object that is responsible (in this case)
* for all server requests.
* All the REST calls used in the app pass through here. */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/'

const appService = {
  /* Receives a type{'cpf' or 'cnpj'} and make a GET request */
  getCertifications (type) {
    return new Promise((resolve) => {
      axios.get(`/certifications?type=${type}`)
        .then(response => {
          resolve(response.data)
        })
    })
  },

  /* Receives a newCert{'New certification obj'} and make a POST request */
  createCertifications (newCert) {
    return new Promise((resolve, reject) => {
      axios.post('/certifications', newCert)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response)
        })
    })
  },

  /* Receives an ID and the updateCert as fields to be updated in server
  and make a PUT request */
  updateCertifications (id, updateCert) {
    return new Promise((resolve, reject) => {
      axios.put(`/certifications/${id}`, updateCert)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response)
        })
    })
  },

  /* Receives an ID refered to the Certification be deleted in server
  and make a DELETE request */
  removeCertifications (id) {
    return new Promise((resolve, reject) => {
      axios.delete(`/certifications/${id}`)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response)
        })
    })
  },

  /* Just call for the server status with a GET request */
  getServerStatus () {
    return new Promise((resolve) => {
      axios.get('/status')
        .then(response => {
          resolve(response.data)
        })
    })
  }
}

export default appService
