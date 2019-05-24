import Item from '../../database/models/Item'
import { InternalServerError, NotFound, BadRequest } from '../utils'

class Controller {
  async index (ctx) {
    const items = await new Item()
      .fetchAll({ withRelated: ['user', 'category'] })
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = items
  }

  async show (ctx) {
    const item = await new Item({ id: ctx.params.id })
      .fetch({ withRelated: ['user', 'category'], require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = item
  }

  async create (ctx) {
    const { body } = ctx.request
    const item = await new Item({
      name: body.name,
      category_id: body.category_id,
      user_id: ctx.state.user.sub.id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = await new Item({ id: item.id })
      .fetch({ withRelated: ['user', 'category'], require: true })
  }

  async update (ctx) {
    const { body } = ctx.request

    const item = await new Item({ id: ctx.params.id })
      .save({
        name: body.name,
        category_id: body.category_id,
        user_id: ctx.state.user.sub.id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = await new Item({ id: item.id })
      .fetch({ withRelated: ['user', 'category'], require: true })
  }

  async destroy (ctx) {
    await new Item({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}

export default Controller
