import Router from 'koa-router'
import ItemsController from '../controllers/items-controller'
import ItemsValidate from '../schemas/items-schemas'

const router = new Router()
const ctrl = new ItemsController()
const valid = new ItemsValidate()

router.get('/items', ctrl.index)
router.get('/items/:id', ctrl.show)
router.post('/items', valid.create(), ctrl.create)
router.put('/items/:id', valid.update(), ctrl.update)
router.delete('/items/:id', ctrl.destroy)

export default router.routes()
