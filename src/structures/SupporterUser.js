const User = require('./User');

class SupporterUser extends User {
  constructor(data) {
    super();
    if (data) setup(data);
  }

  setup(data) {
    /**
     * アイテム・スコア
     * @type {number}
     */
    this.point = data.user.point;

    /**
     * 累計スコア
     * @type {number}
     */
    this.totalPoint = data.user.total_point;
  }
}

module.exports = SupporterUser;
