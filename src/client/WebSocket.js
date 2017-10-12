const webSocket = require('ws')
const {EventEmitter} = require('events')
const Movie = require('../structures/Movie')

class WebSocket extends EventEmitter {
  constructor(basic) {
    super()
    this.ws = new webSocket(`wss://${basic}@realtime.twitcasting.tv/lives`)
    this.ws.on('message', data => {
      this.emit('message', data.map(e => new Movie(e)))
    })
  }
}

module.exports = WebSocket
