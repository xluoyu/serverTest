import Router from '@koa/router';
import Manage from './manage';

const router = new Router()
router.use('/manage', Manage)

export default router.routes()