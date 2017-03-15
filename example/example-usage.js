/** This is an example to use sugo-endpoint-actor */

'use strict'

const sgServer = require('sg-server')

const sugoActor = require('sugo-actor')
const { Module } = sugoActor()
const sugoEndpointActor = require('sugo-endpoint-actor')

// Define actor who receive methods from http
const httpActor = sugoActor({
  key: 'http',
  modules: {
    greeting: new Module({
      sayHello ({ msg }) {
        return `Hello! ${msg}`
      }
    })
  }
})

const server = sgServer({
  middlewares: [
    /* ... */
  ],
  endpoints: {
    // Exports actor module functions as http endpoint (like "/api/greeting/say-hello")
    '/api/:module/:method': sugoEndpointActor(httpActor)
  }
})

server.listen(3000)

