import { Context } from 'koa';
import Router from '@koa/router';
import { getRepository, Brackets } from 'typeorm';
import { Admin, Role, MisList } from '../../entity/Admin';
import { ParamException, UnauthorizedException } from '../../middlewares/exceptions';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import {secret} from '../../config'

const router = new Router()

/*** 账号相关 ***/

/**
 * @description: 账号注册
 * @param username {string} 用户名/账号
 * @param password {string} 密码
 */
router.post('/public/register', async (ctx:Context) => {
  const req = ctx.request.body
  const newUser = new Admin()
  const roleRepository = getRepository(Role)
  const superAdmin = await roleRepository.findOne(1)
  newUser.name = req.username
  newUser.password = md5(req.password)
  if (superAdmin) {
    newUser.role = superAdmin
  }
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
  const users = await userRepository
    .createQueryBuilder("admin")
    .where('admin.name = :name', {name: username})
    .leftJoinAndSelect("admin.role", "role")
    .leftJoinAndSelect("role.list", "route")
    .getMany()
  const user = users[0]
  const validator = ctx.validator()
  validator.required('username')
  if (!user) {
    throw new ParamException('用户名不存在');
  } else if (await md5(password) == user.password) {
    ctx.body = {
      status: 200,
      user: {
        username: user.name,
        role: user.role.name,
        list: user.role.list,
      },
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
  const users = await userRepository
    .createQueryBuilder("admin")
    .where('admin.id = :ID', {ID})
    .leftJoinAndSelect("admin.role", "role")
    .leftJoinAndSelect("role.list", "route")
    .getMany()
  const user = users[0]
  if (!user) {
    throw new UnauthorizedException('登录过期');
  } else {
    ctx.body = {
      status: 200,
      user: {
        username: user.name,
        role: user.role.name,
        list: user.role.list,
      },
      token: jwt.sign({id: user.id}, secret, {expiresIn: '2 days'})
    }
  }
});

/**
 * 修改账号密码
 */
router.post('/updatePsd', async (ctx:Context) => {
  const ID = ctx.state.user.id
  const req = ctx.request.body
  const admin = new Admin()
  admin.password = req.password
  const adminRepository = getRepository(Admin)
  await adminRepository.update(ID, admin)
  ctx.body = {
    status: 200,
    data: {
      msg: '修改成功'
    }
  }
});

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
    .leftJoinAndSelect("user.role", "role")
    .leftJoinAndSelect("role.list", "route")
    .select(["user.id","user.name","role", "route"])
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
 * 修改用户角色
 */
router.post('/updateUserRole', async (ctx:Context) => {
  const req = ctx.request.body
  const admin = new Admin()
  admin.id = req.id
  const roleRepository = getRepository(Role)
  const role = await roleRepository.findOne(req.roleId)
  if (role) {
    admin.role = role
  }
  const adminRepository = getRepository(Admin)
  await adminRepository.save(admin)
  ctx.body = {
    status: 200,
    data: {
      msg: '修改成功'
    }
  }
});

/*** 角色 ***/

// 角色列表
router.get('/getrolesList', async (ctx:Context) => {
  const req = ctx.request.query
  req.size = req.size || 10
  req.page = req.page > 0 ? req.page - 1 : 0
  const userRepository = getRepository(Role)
  const [users, count] = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.list", "route")
    .select(["user.id","user.name","route"])
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

// 修改角色
router.post('/updateRole', async (ctx:Context) => {
  const req = ctx.request.body
  const role = new Role()
  role.id = req.id
  role.name = req.name
  const repository = getRepository(Role)
  const routeRepository = getRepository(MisList)
  const routes = await routeRepository.findByIds(req.list)
  role.list = routes
  await repository.save(role)
  ctx.body = {
    status: 200,
    data: {
      msg: `${req.id ? '修改' : '添加'}成功`
    }
  }
});

// 修改角色
router.post('/deleteRole', async (ctx:Context) => {
  const req = ctx.request.body
  const validator = ctx.validator()
  validator.required('id')
  const userRepository = getRepository(Role)
  await userRepository.delete(req.id)
  ctx.body = {
    status: 200,
    data: {
      msg: `删除成功`
    }
  }
});

/*** 路由相关 ***/
// 获取路由列表
router.get('/getRouterList', async (ctx:Context) => {
  const req = ctx.request.query
  req.name = req.name || ''
  req.parentId = req.parentId || ''
  req.size = req.size || 10
  req.page = req.page > 0 ? req.page - 1 : 0
  const userRepository = getRepository(MisList)
  const [list, count] = await userRepository
    .createQueryBuilder("route")
    .select(["route.id","route.name","route.router","route.parentId"])
    .where('route.name like :name', {name: '%' + req.name + '%'})
    .andWhere(new Brackets(qb => {
      if (req.parentId) {
        qb.where('route.parentId = :parentId', {parentId: req.parentId})
      } else {
        qb.where('0 = 0')
      }
    }))
    .orderBy("route.id", "DESC")
    .skip(req.size * req.page)
    .take(req.size)
    .getManyAndCount()
  const nameList = await userRepository.findByIds(list.map(i => {
    if (i.parentId > 0) {
      return i.parentId
    }
  }))
  list.forEach(item => {
    let data: MisList | undefined = nameList.find(i => i.id == item.parentId)
    item.parentName = data?.name
  })
  ctx.body = {
    status: 200,
    data: {
      list: list,
      count: count
    }
  }
});

// 获取所有父级路由
router.get('/getAllParentRouterList', async (ctx:Context) => {
  const userRepository = getRepository(MisList)
  const list = await userRepository
    .createQueryBuilder("route")
    .select(['route.id', 'route.name'])
    .where('route.parentId = -1')
    .orderBy("route.id", "DESC")
    .getMany()
  ctx.body = {
    status: 200,
    data: {
      list: list
    }
  }
});

// 更新路由
router.post('/updateRouter', async (ctx:Context) => {
  const req = ctx.request.body
  const route = new MisList()
  route.name = req.name
  route.router = req.router
  route.parentId = req.parentId || -1
  const userRepository = getRepository(MisList)
  if (req.id) {
    await userRepository.update(req.id, route)
  } else {
    await userRepository.save(route)
  }
  ctx.body = {
    status: 200,
    data: {
      msg: `${req.id ? '修改' : '添加'}成功`
    }
  }
})

// 删除路由
router.post('/deleteRouter', async (ctx:Context) => {
  const req = ctx.request.body
  const validator = ctx.validator()
  validator.required('id')
  const userRepository = getRepository(MisList)
  await userRepository.delete(req.id)
  ctx.body = {
    status: 200,
    data: {
      msg: `删除成功`
    }
  }
})

export default router.routes()