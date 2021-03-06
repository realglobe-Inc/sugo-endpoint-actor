sugo-endpoint-actor
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/sugo-endpoint-actor
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/sugo-endpoint-actor
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/sugo-endpoint-actor.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/sugo-endpoint-actor
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/sugo-endpoint-actor.svg?token=
[bd_license_url]: https://github.com/realglobe-Inc/sugo-endpoint-actor/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/sugo-endpoint-actor
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/sugo-endpoint-actor.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/sugo-endpoint-actor.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/sugo-endpoint-actor
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/sugo-endpoint-actor.svg
[bd_npm_url]: http://www.npmjs.org/package/sugo-endpoint-actor
[bd_npm_shield_url]: http://img.shields.io/npm/v/sugo-endpoint-actor.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Convert actor module methods into http endpoints

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/00.Requirements.md.hbs" Start -->

<a name="section-doc-guides-00-requirements-md"></a>

Requirements
-----

<a href="https://nodejs.org">
  <img src="https://realglobe-inc.github.io/sugos-assets/images/nodejs-banner.png"
       alt="Node.js"
       height="40"
       style="height:40px"
  /></a>
<a href="https://docs.npmjs.com/">
  <img src="https://realglobe-inc.github.io/sugos-assets/images/npm-banner.png"
       alt="NPM"
       height="40"
       style="height:40px"
  /></a>

+ [Node.js ( >=6 )][node_download_url]
+ [npm ( >=4 )][npm_url]

[node_download_url]: https://nodejs.org/en/download/
[npm_url]: https://docs.npmjs.com/


<!-- Section from "doc/guides/00.Requirements.md.hbs" End -->

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install sugo-endpoint-actor --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

Create an instance and apply to sg-server (or sugo-cloud)

```javascript
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
    '/api/:module/:method': { POST: sugoEndpointActor(httpActor) }
  }
})

server.listen(3000)


```

Then call the api from agent script.

```javascript
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

```

<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Signature.md.hbs" Start -->

<a name="section-doc-guides-03-signature-md"></a>

Signature
-------

#### sugoEndpointActor(actor, options) -> function

Convert actor module methods into http endpoints

##### Args

| Name | Type | Default | Description |
| --- | ---- | --- | --- |
| actor | SugoActor  |  | Actor to exports |
| options | object  |  | Optional settings. |


<!-- Section from "doc/guides/03.Signature.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/sugo-endpoint-actor/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [SUGOS][sugos_url]
+ [Realglobe,Inc.][realglobe,_inc__url]

[sugos_url]: https://github.com/realglobe-Inc/sugos
[realglobe,_inc__url]: http://realglobe.jp

<!-- Links End -->
