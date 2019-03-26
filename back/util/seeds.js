const Certification = require('../api/certifications/certificationsModel')
const _ = require('lodash')
const certs =
  [{
    value: '45092461020',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '06167732000',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '85949479092',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '30402768086',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '10387638008',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '30413595021',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '91180919033',
    blacklisted: false,
    type: 'cpf'
  },
  {
    value: '81039487000118',
    blacklisted: false,
    type: 'cnpj'
  },
  {
    value: '82141749000113',
    blacklisted: false,
    type: 'cnpj'
  },
  {
    value: '66669527000111',
    blacklisted: false,
    type: 'cnpj'
  },
  {
    value: '20864648000113',
    blacklisted: false,
    type: 'cnpj'
  },
  {
    value: '43442260000120',
    blacklisted: false,
    type: 'cnpj'
  },
  {
    value: '88004481000154',
    blacklisted: false,
    type: 'cnpj'
  }
  ]

const cleanDB = () => {
  console.log('Server: Cleaning DB')

  let cleanPromises = [Certification]
    .map((model) => {
      return model.remove().exec()
    })
  return Promise.all(cleanPromises)
}

const createDoc = (model, doc) => {
  return new Promise((resolve, reject) => {
    new model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved)
    })
  })
}

var createCertifications = data => {
  let promises = certs.map(cert => {
    return createDoc(Certification, cert)
  })

  return Promise.all(promises)
    .then(certifications => {
      return _.merge({certifications: certifications}, data || {})
    })
}

cleanDB()
  .then(createCertifications)
  .catch(console.error)
