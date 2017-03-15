/** This is example of client */

'use strict'

const arequest = require('arequest')
const co = require('co')

co(function * () {
  let request = arequest.create()
  let { body, statusCode } = yield request({
    method: 'POST',
    // Specify the module and method as url with hyphen-case name
    url: `http://localhost/api/greeting/say-hello`,
    json: true,
    body: {
      // Request body will be the first argument of the function
      msg: 'hoge'
    }
  })
  // Return values as response body
  console.log(body) // -> 'Hello! hoge'
}).catch((err) => console.error(err))
