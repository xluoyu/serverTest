import { Context } from 'koa';
import Router from '@koa/router';
import { getRepository } from 'typeorm';
import { Admin, Role } from '../../entity/Admin';
import { ParamException, UnauthorizedException } from '../../middlewares/exceptions';
import jwt from 'jsonwebtoken';
import jwtAuth from 'koa-jwt';
import md5 from 'md5';
import {secret} from '../../config'

const router = new Router()

/**
 * @description: 获取账号列表
 * @param size {Number} 分页用大小
 * @param page {Number} 分页用页数
 */
router.get('/getuserlist', async (ctx:Context) => {
  const req = ctx.request.query
  req.size = req.size || 10
  req.page = req.page > 0 ? req.page - 1 : 0
  const userRepository = getRepository(Admin)
  const [users, count] = await userRepository
    .createQueryBuilder("user")
    .select(["user.id","user.name","user.role"])
    .orderBy("user.id", "DESC")
    .skip(req.size * req.page)
    .take(req.size)
    .getManyAndCount()
  ctx.body = {
      status: 200,
      data: {
        list: users,
        count: count
      }
  }
});

/**
 * @description: 账号注册
 * @param username {string} 用户名/账号
 * @param password {string} 密码
 * @param username {string} 用户名/账号
 */
router.post('/public/register', async (ctx:Context) => {
  const req = ctx.request.body
  const newUser = new Admin()
  newUser.name = req.username
  newUser.password = md5(req.password)
  newUser.role = 0
  const userRepository = getRepository(Admin)
  await userRepository.save(newUser)
  ctx.body = {
    status: 200,
    data: {
      msg: '注册成功'
    }
  }
});

// 登录
router.post('/public/login', async (ctx:Context) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  const userRepository = getRepository(Admin)
  const user = await userRepository.findOne({name: username})
  const validator = ctx.validator()
  validator.required('username')
  if (!user) {
    throw new ParamException('用户名不存在');
  } else if (await md5(password) == user.password) {
    const roleRepository = getRepository(Role)
    const userRole = await roleRepository.findOne({id: user.role})
    ctx.body = {
      status: 200,
      user: {
        username: user.name,
        role: user.role
      },
      list: userRole,
      token: jwt.sign({id: user.id}, secret, {expiresIn: '2 days'})
    }
  } else {
    throw new ParamException('密码错误');
  }
});

// 获取用户信息
router.get('/getuser', async (ctx:Context) => {
  const ID = ctx.state.user.id
  const userRepository = getRepository(Admin)
  const user = await userRepository.findOne({id: ID})
  if (!user) {
    throw new UnauthorizedException('登录过期');
  } else {
    const roleRepository = getRepository(Role)
    const userRole = await roleRepository.findOne({id: user.role})
    ctx.body = {
      status: 200,
      user: {
        username: user.name,
        role: user.role
      },
      list: userRole,
      token: jwt.sign({id: user.id}, secret, {expiresIn: '2 days'})
    }
  }
});

// 角色列表
router.get('/getrolesList', async (ctx:Context) => {
  const req = ctx.request.query
  req.size = req.size || 10
  req.page = req.page > 0 ? req.page - 1 : 0
  const userRepository = getRepository(Role)
  const [users, count] = await userRepository
    .createQueryBuilder("user")
    .select(["user.id","user.name","user.list"])
    .orderBy("user.id", "DESC")
    .skip(req.size * req.page)
    .take(req.size)
    .getManyAndCount()
  ctx.body = {
      status: 200,
      data: {
        list: users,
        count: count
      }
  }
})

router.post('/updateRoles', async (ctx:Context) => {

})


export default router.routes()