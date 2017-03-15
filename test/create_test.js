/**
 * Test case for create.
 * Runs with mocha.
 */
'use strict'

const create = require('../lib/create.js')
const co = require('co')
const sgServer = require('sg-server')
const arequest = require('arequest')
const asleep = require('asleep')
const aport = require('aport')
const assert = require('assert')
const sugoActor = require('sugo-actor')
const { Module } = sugoActor

describe('create', () => {
  let server, baseUrl
  let request = arequest.create()
  before(() => co(function * () {
    let endpoint = create(
      sugoActor({
        key: 'hoge',
        modules: {
          greeting: new Module({
            sayHello ({ msg }) {
              return `Hello! ${msg}`
            }
          })
        }
      })
    )
    assert.ok(endpoint)
    let port = yield aport()
    server = sgServer({
      endpoints: {
        '/api/:module/:method': { POST: endpoint }
      }
    })
    baseUrl = `http://localhost:${port}`
    yield server.listen(port)
  }))

  after(() => co(function * () {
    yield asleep(10)
    yield server.close()
  }))

  it('Send a request', () => co(function * () {
    let { body, statusCode } = yield request({
      method: 'POST',
      url: `${baseUrl}/api/greeting/sayHello`,
      json: true,
      body: {
        msg: 'hoge'
      }
    })
    assert.ok(body)
    assert.equal(statusCode, 200)
    assert.equal(body, 'Hello! hoge')
  }))
})

/* global describe, before, after, it */
