import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        name: Joi.string().required(),
        category_id: Joi.string().guid().required()
      }
    })
  }

  update () {
    return validate({
      body: {
        name: Joi.string().required(),
        category_id: Joi.string().guid().required()
      }
    })
  }
}
