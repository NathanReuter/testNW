import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/'

const appService = {
  getCertifications (type) {
    return new Promise((resolve) => {
      axios.get(`/certifications?type=${type}`)
        .then(response => {
          resolve(response.data)
        })
    })
  },
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
