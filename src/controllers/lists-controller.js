import List from '../../database/models/List'
import { InternalServerError, NotFound, BadRequest } from '../utils'
import Item from '../../database/models/Item'
// import Item from '../../database/models/Item'

class Controller {
  async index (ctx) {
    const lists = await new List()
      .fetchAll({ withRelated: ['user', 'category'] })
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = lists
  }

  async show (ctx) {
    const list = await new List({ id: ctx.params.id })
      .fetch({ withRelated: ['user', 'items'], require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = list
  }

  async create (ctx) {
    const { body } = ctx.request
    const list = await new List({
      name: body.name,
      user_id: ctx.state.user.sub.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    await Promise.all(body.items.map(item => {
      return new Item({
        ...item,
        user_id: ctx.state.user.sub.id,
        list_id: list.id
      }).save()
    })).then(async (items) => {
      await list.related('items').add(items)
    })

    ctx.body = await new List({ id: list.id })
      .fetch({ withRelated: ['user', 'items'], require: true })
  }

  async update (ctx) {
    const { body } = ctx.request

    const list = await new List({ id: ctx.params.id })
      .save({
        name: body.name,
        user_id: ctx.state.user.sub.id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = await new List({ id: list.id })
      .fetch({ withRelated: ['user', 'items'], require: true })
  }

  async destroy (ctx) {
    await new List({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}

export default Controller
