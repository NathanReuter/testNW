const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('../../validators')

let CertificationsSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },

  blacklisted: {
    type: Boolean,
    required: true
  },

  type: {
    type: String,
    required: true,
    enum: ['cpf', 'cnpj']
  }
})

CertificationsSchema.pre('save', function (next) {
  const validationMethod = this.type === 'cpf' ? validator.validateCPF : validator.validateCNPJ

  if (!validationMethod(this.value)) {
    next(new Error(this.type.concat(' is Invalid')))
  }
  next()
})

module.exports = mongoose.model('certifications', CertificationsSchema)
