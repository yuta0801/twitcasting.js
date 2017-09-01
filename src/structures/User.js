/**
 * ユーザーを表すクラス
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
    this.id = data.id;

    /**
     * id同様にユーザを特定する識別子ですが、
     * screen_idはユーザによって変更される場合があります。
     * @type {string}
     */
    this.screenId = data.screen_id;

    /**
     * ヒューマンリーダブルなユーザの名前
     * @type {string}
     */
    this.name = data.name;

    /**
     * ユーザアイコンのURL
     * @type {string}
     */
    this.image = data.image;

    /**
     * プロフィール文章
     * @type {string}
     */
    this.profile = data.profile;

    /**
     * ユーザのレベル
     * @type {number}
     */
    this.level = data.level;

    /**
     * ユーザが最後に配信したライブのID
     * @type {?string}
     */
    this.lastMovieId = data.last_movie_id;

    /**
     * 現在ライブ配信中かどうか
     * @type {Boolean}
     */
    this.isLive = Boolean(user.is_live);

    /**
     * ユーザーが作成されたタイムスタンプ
     * @type {number}
     */
    this.created = data.created;
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
