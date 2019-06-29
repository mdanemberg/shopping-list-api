import Router from 'koa-router'
import ListsController from '../controllers/lists-controller'

const router = new Router()
const ctrl = new ListsController()

router.get('/lists', ctrl.index)
router.get('/lists/:id', ctrl.show)
router.post('/lists', ctrl.create)
router.put('/lists/:id', ctrl.update)
router.delete('/lists/:id', ctrl.destroy)

export default router.routes()
