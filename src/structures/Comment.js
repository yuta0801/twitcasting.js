const User = require('./User')

/**
 * コメントを表す
 */
class Comment {
  constructor(data) {
    if (data) this.setup(data)
  }

  setup(data) {
    /**
     * コメントID
     * @type {string}
     */
    this.id = data.id

    /**
     * コメント本文
     * @type {string}
     */
    this.message = data.message

    /**
     * コメント投稿者の情報
     * @type {User}
     */
    this.fromUser = new User(data.from_user)

    /**
     * コメント投稿日時のunixタイムスタンプ
     * @type {number}
     */
    this.created = data.created
  }
}

module.exports = Comment
