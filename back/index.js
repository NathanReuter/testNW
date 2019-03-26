/* Main file for the api server */

const backEndServer = (app, isProd) => {
  let route = '/api'
  const config = require('./config')(isProd)
  const bodyParser = require('body-parser')

  if (config.seed) {
    require('./util/seeds')
  }
  /* Connect to mongo with mongoose */
  require('mongoose').connect(config.db.url)

  /* Initialize reqcount */
  app.reqcount = 0
  app.use((req, res, next) => {
    /* Setup req counter */
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
