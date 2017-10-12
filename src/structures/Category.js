const SubCategory = require('./SubCategory')

/**
 * 配信カテゴリを表す
 */
class Category {
  constructor(data) {
    if (data) this.setup(data)
  }

  setup(data) {
    /**
     * カテゴリID
     * @type {string}
     */
    this.id = data.id

    /**
     * カテゴリ名
     * @type {string}
     */
    this.name = data.name

    /**
     * サブカテゴリ
     * @type {SubCategory[]}
     */
    this.subCategories = data.sub_categories.map(e => new SubCategory(e))
  }
}

module.exports = Category
