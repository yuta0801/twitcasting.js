/**
 * 配信サブカテゴリを表すオブジェクト
 */
class SubCategory {
  constructor(data) {
    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * サブカテゴリID
     * @type {string}
     */
    this.id = data.id;

    /**
     * サブカテゴリ名
     * @type {string}
     */
    this.name = data.name;

    /**
     * サブカテゴリ配信数
     * @type {count}
     */
    this.count = data.count;
  }
}

module.exports = SubCategory;
