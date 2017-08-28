import Router from 'koa-router'
import usersCtrl from '../controller/users'
import contentCtrl from '../controller/content'

const router = new Router()

router.prefix('/api')

router.get('/user', usersCtrl.info)
router.get('/content/series/content_list', contentCtrl.list)
router.post('/content/series/unit/create_unit', contentCtrl.createUnit)
router.post('/content/series/delete_unit', contentCtrl.removeUnit)
router.post('/content/series/remove_content', contentCtrl.removeContent)
router.post('/content/series/update_unit', contentCtrl.updateUnit)

export default router
