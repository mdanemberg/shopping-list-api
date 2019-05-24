import bookshelf from '../bookshelf'
import User from './User'
import Category from './Category'

export default bookshelf.Model.extend({
  tableName: 'items',
  hasTimestamps: true,
  uuid: true,
  category: function () {
    return this.belongsTo(Category)
  },
  user: function () {
    return this.belongsTo(User)
  },
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.user_id
    delete attrs.category_id

    return attrs
  }
})
