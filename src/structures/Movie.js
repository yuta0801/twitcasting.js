/**
 * ライブ（録画）を表すクラス
 */
class Movie {
  constructor(data) {
    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * ライブID
     * @type {string}
     */
    this.id = data.id;

    /**
     * ライブ配信者のユーザID
     * @type {string}
     */
    this.userId = data.user_id;

    /**
     * タイトル
     * @type {string}
     */
    this.title = data.title;

    /**
     * テロップ
     * @type {?string}
     */
    this.subtitle = data.subtitle;

    /**
     * ライブ配信者の最新コメントの文章
     * @type {?string}
     */
    this.lastOwnerComment = data.last_owner_comment;

    /**
     * カテゴリID
     * @type {?string}
     */
    this.category = data.category;

    /**
     * ライブ(録画)へのリンクURL
     * @type {string}
     */
    this.link = data.link;

    /**
     * ライブ配信中かどうか
     * @type {Boolean}
     */
    this.isLive = data.is_live;

    /**
     * 録画が公開されているかどうか
     * @type {Boolean}
     */
    this.isRecorded = data.is_recorded;

    /**
     * 総コメント数
     * @type {number}
     */
    this.commentCount = data.comment_count;

    /**
     * サムネイル画像(大)のURL
     * @type {string}
     */
    this.largeThumbnail = data.large_thumbnail;

    /**
     * サムネイル画像(小)のURL
     * @type {string}
     */
    this.smallThumbnail = data.small_thumbnail;

    /**
     * 配信地域(国コード)
     * @type {string}
     */
    this.country = data.country;

    /**
     * 配信時間(秒)
     * @type {number}
     */
    this.duration = data.duration;

    /**
     * 配信開始日時のunixタイムスタンプ
     * @type {number}
     */
    this.created = data.created;

    /**
     * コラボ配信かどうか
     * @type {Boolean}
     */
    this.isCollabo = data.is_collabo;

    /**
     * 合言葉配信かどうか
     * @type {Boolean}
     */
    this.isProtected = data.is_protected;

    /**
     * 最大同時視聴数
     * @type {number}
     */
    this.maxViewCount = data.max_view_count;

    /**
     * 現在の同時視聴者数(配信中ではない場合0)
     * @type {number}
     */
    this.currentViewCount = data.current_view_count;

    /**
     * 総視聴者数
     * @type {number}
     */
    this.totalViewCount = data.total_view_count;

    /**
     * HTTP Live Streaming再生用のURL
     * @type {string}
     */
    this.hlsUrl = data.hls_url;
  }
}

module.exports = Movie;
