/**
 * WebHookを表す
 */
class WebHook {
  constructor(data) {
    if (data) this.setup(data)
  }

  setup(data) {
    /**
     * ユーザID
     * @type {string}
     */
    this.userId = data.user_id

    /**
     * フックするイベント種別
     * @type {string}
     */
    this.event = data.event
  }
}

module.exports = WebHook
