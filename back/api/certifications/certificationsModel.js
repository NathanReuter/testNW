/* Certification Model */

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

/* Pre save function that validates the certification by its type before adding it to the database */
CertificationsSchema.pre('save', function (next) {
  if (!validator.validateCertification(this.value, this.type)) {
    next(new Error(this.type.concat(' is Invalid')))
  }
  next()
})

module.exports = mongoose.model('certifications', CertificationsSchema)
