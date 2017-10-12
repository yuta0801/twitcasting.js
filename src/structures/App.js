/**
 * アプリケーションを表すクラス
 */
class App {
  constructor(data) {
    if (data) this.setup(data)
  }

  setup(data) {
    /**
     * アプリケーションのクライアントID
     * @type {string}
     */
    this.clientId = data.client_id

    /**
     * アプリケーション名
     * @type {string}
     */
    this.name = data.name

    /**
     * アプリケーション所有者のユーザID
     * @type {UserId}
     */
    this.ownerUserId = data.owner_user_id
  }
}

module.exports = App
