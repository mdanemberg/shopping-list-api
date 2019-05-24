import Router from 'koa-router'
import users from './users-router'
import roles from './roles-router'
import me from './me-router'
import categories from './categories-router'
import items from './items-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(roles)
api.use(me)
api.use(categories)
api.use(items)

router.use('/v1', api.routes())

export default router
