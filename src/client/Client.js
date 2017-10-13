const base64 = require('base-64')
const Request = require('./Request')
const WebSocket = require('./WebSocket')

const App = require('../structures/App')
const Categorie = require('../structures/Category')
const Movie = require('../structures/Movie')
const SupporterUser = require('../structures/SupporterUser')
const User = require('../structures/User')
const WebHook = require('../structures/WebHook')

class Client {
  /**
   * 通信するための情報を記録する
   * @param  {string} tokenOrClinetID トークンまたはClinetID
   * ClinetIDの場合は、ClientSecretを入力する必要があります
   * @param  {string} [ClientSecret]  ClientSecret
   * ClinetIDが入力された場合にのみ必要です
   * @example
   * // tokenを使用する場合
   * const token = '_Token_'
   * const client = new TwitCasting.client(token)
   * @example
   * // ClinetIDとClientSecretを使用する場合
   * const ClinetID = '_ClientSecret_'
   * const ClientSecret = '_ClientID_'
   * const client = new TwitCasting.client(ClinetID, ClientSecret)
   */
  constructor(tokenOrClinetID, ClientSecret) {
    if (ClientSecret) {
      const basic = base64.encode(`${tokenOrClinetID}:${ClientSecret}`)
      this.auth = `Basic ${basic}`
    } else {
      this.auth = `Bearer ${tokenOrClinetID}`
    }

    this.request = new Request(this.auth).send
  }

  /**
   * ユーザ情報を取得する
   * @param  {string} userId ユーザの id または screen_id
   * @return {User}
   */
  getUserInfo(userId) {
    this.request(`GET /users/${userId}`, data => {
      return new User(data.user)
    })
  }

  /**
   * 配信中のライブのサムネイル画像URLを取得する
   * @param  {string} userId            ユーザの id または screen_id
   * @param  {string} [size=small]      画像サイズ (“large” or “small”)
   * @param  {string} [position=latest] ライブ開始時点または最新を指定可能 (“beginning” or “latest”)
   * @return {string}                   サムネイル画像URL
   */
  getLiveThumbnailImageURL(userId, size='small', position='latest') {
    return `${this.baseURL}/users/${userId}/live/thumbnail?size=${size}&position=${position}`
  }

  /**
   * アプリケーション、ユーザ情報
   * @typedef  {Object} Application
   * @property {App}    app  アプリケーションを表す
   * @property {User}   user ユーザを表すオブジェクト
   */

  /**
   * アクセストークンを検証し、ユーザ情報を取得する
   * @return {Application}
   */
  verifyCredentials() {
    this.request('GET /verify_credentials', data => {
      return {
        app:  new User(data.user),
        user: new App(data.app),
      }
    })
  }

  /**
   * ライブ（録画）情報を表すオブジェクト
   * @type {Object} MovieInfo
   * @property {Movie} movie       ライブ（録画）を表すクラス
   * @property {User}  broadcaster 配信者のユーザ情報
   * @property {Array} tags        設定されているタグの配列
   */

  /**
   * ライブ（録画）情報を取得する
   * @param  {string} movieId 動画ID
   * @return {MovieInfo}
   */
  getMovieInfo(movieId) {
    this.request(`GET /movies/${movieId}`, data => {
      return {
        movie: new Movie(data.movie),
        broadcaster: new User(data.broadcaster),
        tags: data.tags,
      }
    })
  }

  /**
   * 複数のライブ（録画）を表す
   * @type {Object} Movies
   * @property {number}  totalCount 指定フィルター条件での総件数
   * @property {Movie[]} Movieの配列
   */

  /**
   * ユーザーが保有する過去ライブ（録画）の一覧を作成日時の降順で取得する
   * @param  {string} userId ユーザの id または screen_id
   * @param  {number} [offset=0] 先頭からの位置
   * @param  {number} [limit=20] 最大取得件数(場合により、指定件数に満たない数の動画を返す可能性があります)
   * @return {Movies}
   */
  getMoviesByUser(userId, offset, limit) {
    this.request(`GET /users/${userId}/movies`, {
      offset: offset,
      limit: limit,
    }, data => {
      return {
        totalCount: data.total_count,
        movies: data.movies.map(e => new Movie(e)),
      }
    })
  }

  /**
   * ユーザーが配信中の場合、ライブ情報を取得する
   * @param  {string} userId ユーザの id または screen_id
   * @return {MovieInfo}
   */
  getCurrentLive(userId) {
    this.request(`GET /users/${userId}/current_live`, data => {
      return {
        movie: new Movie(data.movie),
        broadcaster: new User(data.broadcaster),
        tags: data.tags,
      }
    })
  }

  /**
   * 複数のコメントを表すオブジェクト
   * @type {Object} Comments
   * @property {string} movieId 動画ID
   * @property {number} allCount 総コメント数
   * @property {Comment[]} comments Commentの配列
   */

  /**
   * コメントを作成日時の降順で取得する
   * @param  {string} movieId 動画ID
   * @param  {number} [offset=0] 先頭からの位置
   * @param  {number} [limit=10] 取得件数
   * @param  {number} [sliceId=none] このコメントID以降のコメントを取得する
   * @return {Comments}
   */
  getComments(movieId, offset, limit, sliceId) {
    this.request(`GET /movies/${movieId}/comments`, {
      offset: offset,
      limit: limit,
      slice_id: sliceId,
    }, data => {
      return {
        movieId: data.movie_id,
        allCount: data.all_count,
        comments: data.comments.map(e => new Comment(e)),
      }
    })
  }

  /**
   * コメント情報
   * @type {Object} CommentInfo
   * @property {string} movieId ライブID
   * @property {number} allCount 総コメント数
   * @property {Comment} コメント
   */

  /**
   * コメントを投稿する ユーザ単位でのみ実行可能です
   * @param  {string} movieId 動画ID
   * @param  {string} comment 投稿するコメント文章
   * @param  {string} [sns=none] SNSへの同時投稿
   * @return {CommentInfo}
   */
  postComment(movieId, comment, sns) {
    this.request(`POST /movies/${movieId}/comments`, {
      comment: comment,
      sns: sns,
    }, data => {
      return {
        movieId: data.movie_id,
        all_count: data.all_count,
        comment: new Comment(data.comment),
      }
    })
  }

  /**
   * コメントを削除する
   * @param  {string} movieId   動画ID
   * @param  {string} commentId コメントID
   * @return {string}           削除したコメントのID
   */
  deleteComment(movieId, commentId) {
    this.request(`DELETE /movies/${movieId}/comments/${commentId}`, data => {
      return data.comment_id
    })
  }

  /**
   * サポートステイタス
   * @type {Object} SupportingStatus
   * @property {Boolean} isSupporting サポーターかどうか
   * @property {User} targetUser 対象ユーザ情報
   */

  /**
   * ユーザーが、ある別のユーザのサポーターであるかの状態を取得する
   * @param  {string} userId       ユーザの id または screen_id
   * @param  {string} targetUserId 対象ユーザ
   * @return {SupportingStatus}
   */
  getSupportingStatus(userId, targetUserId) {
    this.request(`GET /users/${userId}/supporting_status`, {
      target_user_id: targetUserId,
    }, data => {
      return {
        isSupporting: data.is_supporting,
        targetUser: data.target_user,
      }
    })
  }

  /**
   * 指定したユーザーのサポーターになる
   * @param  {UserId[]} targetUserIds 対象ユーザの id または screen_id の配列
   * @return {number} サポーター登録を行った件数
   */
  supportUser(targetUserIds) {
    this.request('PUT /support', {
      target_user_ids: targetUserIds,
    }, data => {
      return data.addedCount
    })
  }

  /**
   * 指定したユーザーのサポーター状態を解除する
   * @param  {UserId[]} targetUserIds 対象ユーザの id または screen_id の配列
   * @return {number} サポーター解除を行った件数
   */
  unsupportUser(targetUserIds) {
    this.request('PUT /unsupport', {
      target_user_ids: targetUserIds,
    }, data => {
      return data.removed_count
    })
  }

  /**
   * 複数のサポートしている人を表す
   * @type {Object} Supporting
   * @property {number} total 全レコード数
   * @property {SupportUser[]} SupporterUserの配列
   */

  /**
   * 指定したユーザーがサポートしているユーザーの一覧を取得する
   * @param  {string} userId     ユーザの id または screen_id
   * @param  {number} [offset=0] 先頭からの位置
   * @param  {number} [limit=20] 取得件数
   * @return {Supporting}
   */
  supportingList(userId, offset, limit) {
    this.request(`GET /users/${userId}/supporting`, {
      offset: offset,
      limit: limit,
    }, data => {
      return {
        total: data.total,
        supporting: data.supporting.map(e => new SupporterUser(e)),
      }
    })
  }

  /**
   * 指定したユーザーをサポートしているユーザーの一覧を取得する
   * @param  {string} userId ユーザの id または screen_id
   * @param  {number} offset 先頭からの位置
   * @param  {number} limit  取得件数
   * @param  {string} sort   ソート順
   * @return {Supporting}
   */
  supporterList(userId, offset, limit, sort) {
    this.request(`GET /users/${userId}/supporters`, {
      offset: offset,
      limit: limit,
      sort: sort,
    }, data => {
      return {
        total: data.total,
        supporters: data.supporting.map(e => new SupporterUser(e)),
      }
    })
  }

  /**
   * 配信中のライブがあるカテゴリのみを取得する
   * @param  {string} lang 検索対象の言語
   * @return {Categorie[]} Categoryオブジェクトの配列
   */
  getCategories(lang) {
    this.request('GET /categories', {
      lang: lang,
    }, data => {
      return data.categories.map(e => new Categorie(e))
    })
  }

  /**
   * ユーザを検索する
   * @param  {string} words スペース区切りで複数単語のAND検索
   * @param  {number} [limit] 取得件数
   * @param  {string} [lang=ja] 検索対象のユーザの言語設定
   * @return {User[]} Userオブジェクトの配列
   */
  searchUsers(words, limit, lang='ja') {
    this.request('GET /search/users', {
      words: words,
      limit: limit,
      lang: lang,
    }, data => {
      return data.users.map(e => new User(e))
    })
  }

  /**
   * 配信中のライブを検索する
   * @param  {number} limit   取得件数
   * @param  {number} type    検索種別
   * @param  {string} context 検索
   * @param  {string} lang    検索対象のライブ配信者の言語設定
   * @return {Movie[]}         Movieオブジェクトの配列
   */
  searchLiveMovies(limit, type, context, lang) {
    this.request('GET /search/lives', {
      limit: limit,
      type: type,
      context: context,
      lang: lang,
    }, data => {
      return data.movies.map(e => new Movie(e))
    })
  }

  /**
   * WebHookリスト
   * @typedef {Object} WebHookList
   * @property {number} allCount
   * @property {WebHook[]} webhooks WebHookの配列
   */

  /**
   * アプリケーションに紐づく WebHook の一覧を取得する
   * @param  {number} limit  取得件数
   * @param  {number} offset 先頭からの位置
   * @param  {string} userId 対象ユーザの id
   * @return {WebHookList}
   */
  getWebHookList(limit, offset, userId) {
    this.request('GET /webhooks', {
      limit: limit,
      offset: offset,
      userId: userId,
    }, data => {
      return {
        allCount: data.all_count,
        webhooks: data.webhooks.map(e => new WebHook(e)),
      }
    })
  }

  /**
   * WebHook情報
   * @typedef {Object}  WebHookInfo
   * @property {string} userId      ユーザID
   * @property {Array}  addedEvents
   */

  /**
   * WebHookを新規登録します
   * @param  {string} userId ユーザID
   * @param  {Array}  events フックするイベント種別
   * @return {WebHookInfo}
   */
  registerWebHook(userId, events) {
    this.request('POST /webhooks', {
      user_id: userId,
      events: events,
    }, data => {
      return {
        userId: data.user_id,
        addedEvents: data.added_events,
      }
    })
  }

  /**
   * WebHookを削除する
   * @param  {string} userId ユーザの id または screen_id
   * @param  {Array} events  フックを削除するイベント種別
   * @return {Object}         userId、removed_events
   */
  removeWebHook(userId, events) {
    this.request('DELETE /webhooks', {
      user_id: userId,
      events: events,
    }, data => {
      return {
        userId: data.user_id,
        removedEvents: data.removed_events,
      }
    })
  }

  /**
   * RTMP情報
   * @typedef {Object} RTMPInfo
   * @property {Boolean} enabled RTMP配信が有効かどうか
   * @property {?string} url RTMP配信用URL
   * @property {?string} streamKey RTMP配信用キー
   */

  /**
   * アクセストークンに紐づくユーザの配信用のURL(RTMP)を取得する
   * @return {RTMPInfo}
   */
  getRTMPURL() {
    this.request('GET /rtmp_url', data => {
      return {
        enabled: data.enabled,
        url: data.url,
        streamKey: data.stream_key,
      }
    })
  }

  /**
   * WebM情報
   * @typedef {Object} WebMInfo
   * @property {Boolean} enabled WebM配信が有効かどうか
   * @property {?string} url WebM配信用URL
   */

  /**
   * アクセストークンに紐づくユーザの配信用のURL (WebM, WebSocket)を取得する
   * @return {WebMInfo}
   */
  getWebMURL() {
    this.request('GET /webm_url', data => {
      return {
        enabled: data.enabled,
        url: data.url,
      }
    })
  }

  get lives() {
    return new WebSocket(this.auth)
  }

  static get baseURL() {
    return 'https://apiv2.twitcasting.tv'
  }
}

module.exports = Client
