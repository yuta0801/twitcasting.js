const User = require('./User')

class SupporterUser extends User {
  constructor(data) {
    super(data)
    if (data) this.setup(data)
  }

  setup(data) {
    /**
     * アイテム・スコア
     * @type {number}
     */
    this.point = data.point

    /**
     * 累計スコア
     * @type {number}
     */
    this.totalPoint = data.total_point
  }
}

module.exports = SupporterUser
