import bookshelf from '../bookshelf'
import User from './User'
import Item from './Item'

export default bookshelf.Model.extend({
  tableName: 'lists',
  hasTimestamps: true,
  uuid: true,
  items: function () {
    return this.hasMany(Item)
  },
  user: function () {
    return this.belongsTo(User)
  },
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.user_id

    return attrs
  }
})
