/* Router for /certifications */

const controller = require('./certificationController')
let route = '/certifications'

const statusRouter = (app, prevRoute) => {
  route = prevRoute.concat(route)

  app.param('id', controller.params)
  app.get(route, controller.get)
  app.post(route, controller.post)
  app.get(route.concat('/:id'), controller.getOne)
  app.put(route.concat('/:id'), controller.put)
  app.delete(route.concat('/:id'), controller.delete)
}

module.exports = statusRouter
