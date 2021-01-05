import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import Static from 'koa-static';
import logger from 'koa-logger';
import jwt from 'koa-jwt';
import router from './routes';
import { createConnection } from 'typeorm';
import validator from './middlewares/validator';
import 'reflect-metadata';
import {PORT, secret} from './config'

createConnection()
  .then(() => {
    console.log('数据库链接成功')
    // 初始化 Koa 应用实例
    const app = new Koa();
    app.use(logger())
    // 注册中间件
    const staticPath = "../template";
    app.use(Static(
      path.join(__dirname, staticPath)
    ))
    app.use(cors());
    app.use(bodyParser());
    validator(app)
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.status = err.status || 500
        ctx.body = {
          status: ctx.status,
          msg: err.message
        }
      }
    })
    app.use(jwt({secret}).unless({path: [/\/public/]}))
    app.use(router.routes()).use(router.allowedMethods());

    // 运行服务器
    const server = app.listen(PORT);
    console.log('正在监听端口：', PORT)

    function handleExit(signal: any) {
      console.log(`Received ${signal}. Close my server properly.`)
      server.close(function () {
        process.exit(0);
      });
    }
    process.on('SIGINT', handleExit);
    process.on('SIGQUIT', handleExit);
    process.on('SIGTERM', handleExit);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err))

  