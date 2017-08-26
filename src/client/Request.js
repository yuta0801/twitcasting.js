const request = require('request');
const url = request('url');
const Client = require('./Client')

class Request {
  constructor(auth) {
    this.auth = auth;
  }

  send(uri, body, callback) {
    if (typeof body == 'function' && callback == null) {
      callback = body;
      body = null;
    }
    request(this.options(uri, body), callback);
  }

  options(uri, body) {
    let arr = uri.match(/^(GET|POST|PUT|DELETE) (.*)/);
    if (!url.parse(arr[2]).hostname) arr[2] = Client.baseUrl + arr[2];
    return {
      uri: arr[1],
      method: arr[2],
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

module.exports = Request.send();
