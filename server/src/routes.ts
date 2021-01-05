import Router from '@koa/router';
import Mis from './api/mis/index';
import Order from './api/order/index';

const router = new Router()
router.use('/api/mis', Mis)
router.use('/api/order/public', Order)

export default router