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
    this.id = data.user.id;

    /**
     * id同様にユーザを特定する識別子ですが、
     * screen_idはユーザによって変更される場合があります。
     * @type {string}
     */
    this.screenId = data.user.screen_id;

    /**
     * ヒューマンリーダブルなユーザの名前
     * @type {string}
     */
    this.name = data.user.name;

    /**
     * ユーザアイコンのURL
     * @type {string}
     */
    this.image = data.user.image;

    /**
     * プロフィール文章
     * @type {string}
     */
    this.profile = data.user.profile;

    /**
     * ユーザのレベル
     * @type {number}
     */
    this.level = data.user.level;

    /**
     * ユーザが最後に配信したライブのID
     * @type {?string}
     */
    this.lastMovieId = data.user.last_movie_id;

    /**
     * 現在ライブ配信中かどうか
     * @type {Boolean}
     */
    this.isLive = Boolean(data.user.is_live);

    /**
     * ユーザーが作成されたタイムスタンプ
     * @type {number}
     */
    this.created = data.user.created;
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
