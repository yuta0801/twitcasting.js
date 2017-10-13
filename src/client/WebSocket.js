const webSocket = require('ws')
const {EventEmitter} = require('events')
const Movie = require('../structures/Movie')
const User = require('../structures/User')

class WebSocket extends EventEmitter {
  constructor(auth) {
    super()
    this.ws = new webSocket('wss://realtime.twitcasting.tv/lives', {
      headers: {
        'Authorization': auth,
      },
    })
    this.ws.on('message', data => {
      const json = JSON.parse(data)
      console.log(json)
      if (json.hello) this.emit('ready')
      else this.emit('message', json.movies.map(e => {
        return {
          movie: new Movie(e.movie),
          broadcaster: new User(e.broadcaster),
          tags: e.tags,
        }
      }))
    })
  }
}

module.exports = WebSocket
