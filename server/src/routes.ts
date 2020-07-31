import Router from '@koa/router';
import Mis from './api/mis/index';

const router = new Router()
router.use('/api/mis', Mis)

export default router