let route = '/api'
let config = {
  seed: true,
  db: {
    url: 'mongodb://localhost/certvalidator'
  }
}
const bodyParser = require('body-parser')

require('mongoose').connect(config.db.url)

if (config.seed) {
  require('./util/seeds')
}

const backEndServer = (app) => {
  app.reqcount = 0

  /* Setup req counter */
  app.use((req, res, next) => {
    app.reqcount++
    next()
  })

  /* Add body parser middleware */
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  /* Load routes, in this case without express router */
  require('./api/certifications')(app, route)
  require('./api/status')(app, route)

  /* Wildcard for 404 routes */
  app.get(route.concat('/*'), (req, res) => {
    res
      .status(404)
      .send('Missing Route')
  })
}

module.exports = backEndServer
