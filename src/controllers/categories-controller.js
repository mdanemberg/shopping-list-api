import Category from '../../database/models/Category'
import { InternalServerError, NotFound, BadRequest } from '../utils'

class Controller {
  async index (ctx) {
    const categories = await new Category()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = categories
  }

  async show (ctx) {
    const category = await new Category({ id: ctx.params.id })
      .fetch({ require: true })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = category
  }

  async create (ctx) {
    const { body } = ctx.request
    const category = await new Category({
      name: body.name
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = category
  }

  async update (ctx) {
    const { body } = ctx.request

    const category = await new Category({ id: ctx.params.id })
      .save({
        name: body.name
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = category
  }

  async destroy (ctx) {
    await new Category({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}

export default Controller
