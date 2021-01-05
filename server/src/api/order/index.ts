import Router from '@koa/router';
import { Context } from 'koa';

const router = new Router()

let test = [
  {
    id: 1,
    title: '小哥哥',
    status: 1
  },
  {
    id: 2,
    title: '小姐姐',
    status: 2
  }
] 

router.get('/list', async (ctx:Context) => {
    ctx.body = {
      status: 200,
      data: {
        list: test
      }
    }
});

router.get('/detail', async (ctx:Context) => {
  const req = ctx.request.query
  let data = test.find(e => e.id == req.id) || {}
  console.log(ctx.request)
  ctx.body = {
    status: 200,
    data: data
  }
});

router.post('/changeStatus', async (ctx:Context) => {
  const req = ctx.request.body
  let index = test.findIndex(e => e.id == req.id)
  if (index != -1) {
    test[index].status = req.status
    ctx.body = {
      status: 200,
      data: '成功'
    }
  } else{
    ctx.body = {
      status: 405,
      data: '失败'
    }
  }
});

export default router.routes()