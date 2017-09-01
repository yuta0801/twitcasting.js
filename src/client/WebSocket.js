const webSocket = require('ws');
const EventEmitter = require('events').EventEmitter;
const Movie = require('../structures/Movie');

class WebSocket extends EventEmitter {
  constructor(basic) {
    super();
    this.ws = new webSocket(`wss://${basic}@realtime.twitcasting.tv/lives`);
    this.ws.on('message', (data, flags) => {
      let movies = [];
      for (let item of data) movies.push(new Movie(item));
      this.emit('message', movies);
    });
  }
}