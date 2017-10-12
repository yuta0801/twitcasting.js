const request = require('request')
const Client = require('./Client')

class Request {
  constructor(auth) {
    this.auth = auth
  }

  send(url, body, callback) {
    if (typeof body === 'function' && callback === null) {
      callback = body
      body = null
    }
    request(this.options(url, body), callback)
  }

  options(url, body) {
    const array = url.match(/^(GET|POST|PUT|DELETE) (.*)/)
    return {
      url: Client.baseURL + array[1],
      method: array[2],
      headers: {
        'Accept':'application/json',
        'X-Api-Version': '2.0',
        'Authorization': this.auth,
      },
      body: body,
      json: true,
    }
  }
}

module.exports = Request.send
