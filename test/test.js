const TwitCasting = require('../src/index');
const client = new TwitCasting('token');

let userInfo = client.getUserInfo('twitcasting_jp');

console.log(userInfo);
