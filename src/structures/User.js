/**
 * ユーザーを表す
 */
class User {
  constructor(data) {
    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * ユーザID
     * @type {string}
     */
    this.id = user.id;

    /**
     * id同様にユーザを特定する識別子ですが、
     * screen_idはユーザによって変更される場合があります。
     * @type {string}
     */
    this.screenId = user.screen_id;

    /**
     * ヒューマンリーダブルなユーザの名前
     * @type {string}
     */
    this.name = user.name;

    /**
     * ユーザアイコンのURL
     * @type {string}
     */
    this.image = user.image;

    /**
     * プロフィール文章
     * @type {string}
     */
    this.profile = user.profile;

    /**
     * ユーザのレベル
     * @type {number}
     */
    this.level = user.level;

    /**
     * ユーザが最後に配信したライブのID
     * @type {?string}
     */
    this.lastMovieId = user.last_movie_id;

    /**
     * 現在ライブ配信中かどうか
     * @type {Boolean}
     */
    this.isLive = Boolean(user.is_live);

    /**
     * ユーザーが作成されたタイムスタンプ
     * @type {number}
     */
    this.created = user.created;
  }

  /**
   * ユーザーが作成された時刻
   * @return {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.created);
  }
}

module.exports = User;
