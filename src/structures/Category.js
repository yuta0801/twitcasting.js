const SubCategory = require('./SubCategory')

/**
 * 配信カテゴリを表す
 */
class Category {
  constructor(data) {
    if (data) this.setup(data);
  }

  setup(data) {
    /**
     * カテゴリID
     * @type {string}
     */
    this.id = data.id;

    /**
     * カテゴリ名
     * @type {string}
     */
    this.name = data.name;

    /**
     * サブカテゴリ
     * @type {SubCategory[]}
     */
    let subCategoryArray = [];
    for (let subCategory of data.sub_categories) {
      subCategoryArray.push(new SubCategory(subCategory));
    }
    this.subCategories = subCategoryArray;
  }
}

module.exports = Category;
