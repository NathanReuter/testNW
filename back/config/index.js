/* Change config by environment */
const config = isProd => {
  return isProd ? {
    seed: false,
    db: {
      url: 'mongodb://localhost/certvalidator'
    }
  } : {
    seed: true,
    db: {
      url: 'mongodb://localhost/devcertvalidator'
    }
  }
}

module.exports = config
