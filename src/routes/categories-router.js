import Router from 'koa-router'
import CategoriesController from '../controllers/categories-controller'
import CategoriesValidate from '../schemas/categories-schemas'

const router = new Router()
const ctrl = new CategoriesController()
const valid = new CategoriesValidate()

router.get('/categories', ctrl.index)
router.get('/categories/:id', ctrl.show)
router.post('/categories', valid.create(), ctrl.create)
router.put('/categories/:id', valid.update(), ctrl.update)
router.delete('/categories/:id', ctrl.destroy)

export default router.routes()
