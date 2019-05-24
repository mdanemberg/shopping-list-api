import Router from 'koa-router'
import RolesController from '../controllers/categories-controller'
import RolesValidate from '../schemas/categories-schemas'

const router = new Router()
const ctrl = new RolesController()
const valid = new RolesValidate()

router.get('/categories', ctrl.index)
router.get('/categories/:id', ctrl.show)
router.post('/categories', valid.create(), ctrl.create)
router.put('/categories/:id', valid.update(), ctrl.update)
router.delete('/categories/:id', ctrl.destroy)

export default router.routes()
