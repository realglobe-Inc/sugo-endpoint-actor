/**
 * Convert actor module methods into http endpoints
 * @function sugoEndpointActor
 * @param {SugoActor} actor - Actor to exports
 * @param {object} [options] - Optional settings.
 * @returns {function} - Defined app function.
 */

'use strict'

const co = require('co')
const debug = require('debug')('sugo:endpoint:actor')
const { camelcase } = require('stringcase')

const notFoundError = (ctx, message) => {
  ctx.status = 404
  ctx.body = message
}

/** @lends sugoEndpointActor */
function create (actor, options = {}) {
  let endpoint = co.wrap(function * middleware (ctx) {
    debug('handle')
    let { module: moduleName, method: methodName } = ctx.params
    let module = actor.modules[ camelcase(moduleName) ] || actor.modules[ moduleName ]
    if (!module) {
      notFoundError(ctx, `Module not found: ${moduleName}`)
      return
    }
    let method = module[ camelcase(methodName) ] || module[ methodName ]
    if (!method) {
      notFoundError(ctx, `Method not found: ${methodName} in module ${moduleName}`)
      return
    }
    let { body = {} } = ctx.request
    let { query = {} } = ctx
    let args = Object.assign({}, body, query)
    try {
      ctx.body = yield Promise.resolve(method.call(module, args))
      ctx.status = 200
    } catch (e) {
      ctx.status = 400
      ctx.body = `Invocation failed with error: ${e.message || e}`
    }
  })

  Object.assign(endpoint, {
    /**
     * Description of this middleware.
     */
    $desc: 'Wraps actors to provide http endpoints'
  })

  return endpoint
}

module.exports = create
