/**
 * @type {[type]}
 */
class App {
  constructor(data) {
    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * アプリケーションのクライアントID
     * @type {string}
     */
    this.clientId = data.app.client_id;

    /**
     * アプリケーション名
     * @type {string}
     */
    this.name = data.app.name;

    /**
     * アプリケーション開発者のユーザID
     * @type {string}
     */
    this.ownerUserId = data.app.owner_user_id;
  }
}

module.exports = App;
