/* Certifications controller */

const Certification = require('./certificationsModel')
const _ = require('lodash')

/* If the route has an id, this middleware puts the current certification(if it exists)
*  in the req */
exports.params = function (req, res, next, id) {
  Certification.findById(id)
    .then(cert => {
      if (!cert) {
        next(new Error('No certification with that id'))
      } else {
        req.cert = cert
        next()
      }
    }, function (err) {
      next(err)
    })
}

/* Get type and respond with the certifications */
exports.get = (req, res, next) => {
  const type = req.query.type
  const availableTypes = Certification.schema.obj.type.enum

  if (type && !availableTypes.includes(type)) {
    return next(new Error('Unknown certification type'))
  }

  Certification.find(type ? {type: type} : {})
    .then(cert => {
      res.json(cert)
    }, err => {
      next(err)
    })
}

/* Get one certification */
exports.getOne = (req, res) => {
  let cert = req.cert
  res.json(cert)
}

/* Create certification (validation is in the model) */
exports.post = function (req, res, next) {
  let newcert = req.body

  Certification.create(newcert)
    .then(cert => {
      res.json(cert)
    }, err => {
      console.error('Post cert error: ', err)
      next(err)
    })
}

/* Update certification by id only */
exports.put = function (req, res, next) {
  let cert = req.cert
  let update = req.body

  _.merge(cert, update)

  cert.save((err, saved) => {
    if (err) {
      return next(err)
    }

    res.json(saved)
  })
}

/* Delete Certification by id only */
exports.delete = function (req, res, next) {
  req.cert.remove(function (err, removed) {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
