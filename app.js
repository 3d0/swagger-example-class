const SwaggerExpress = require('swagger-express-mw')
const http = require('http')
const express = require('express')
const morgan = require('morgan')

const app = express()
module.exports = app // for testing

const config = {
  appRoot: __dirname, // required config
}

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)

  const httpPort = process.env.PORT || 10010
  const httpApp = http.createServer(app)
  httpApp.listen(httpPort)
})

morgan.token('error', (req, res) => {
  return res.locals.error ? `\n${ res.locals.error.stack }` : ''
})

morgan.token('hana-time', (req, res) => {
  return res.locals.hanaTime ? `${ res.locals.hanaTime } ms` : ''
})


app.use(morgan(':date[iso] :method :url :status :response-time ms - :res[content-length] :error', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stderr,
}))

app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms :hana-time', {
  stream: process.stdout,
}))
