const serverInfo = require('../../serverInfo')
let route = '/status'

const statusRouter = (app, prevRoute) => {
  route = prevRoute.concat(route)

  app.get(route, (req, res) => {
    res.send({ok: true, serverUptime: serverInfo.getUptime(), reqcount: app.reqcount})
  })
}

module.exports = statusRouter
