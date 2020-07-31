import Koa from 'koa';
import {ParamException} from './exceptions'

export default function (app: Koa) {
  interface Params {
    [propName:string]: any
  }
  app.context.validator = function (params: Params) {
    if (!params) {
      params = ['GET', 'HEAD'].includes(this.method.toUpperCase())
        ? this.request.query
        : this.request.body
    }
    return {
      required: function (key: string) {
        if (!Object.keys(params).includes(key)) {
          throw new ParamException(key + ' 参数为空')
        }
      },
      isArray: function (key: string) {
        if (!(params[key] instanceof Array)) {
          throw new ParamException(key + ' 不为数组')
        }
      },
    }
  }
  // app.context.validator = {
  //   params: function () {
  //     return ['GET', 'HEAD'].includes(this.method.toUpperCase())
  //       ? this.request.query
  //       : this.request.body 
  //   },
  //   required: function (key: string) {
  //     let params = ['GET', 'HEAD'].includes(this.method.toUpperCase())
  //     ? this.request.query
  //     : this.request.body;
  //     if (!Object.keys(params).includes(key)) {
  //       throw new ParamException(key + ' 参数为空')
  //     }
  //   }
  // }
  // app.context.validator.
  // {
  //   
  //   custom: (key: string, func: Function) => {
  //     console.log(this.params)
  //     try {
  //       this.required(key)
  //       func(this.params[key])
  //     } catch(err) {
  //       console.log(err)
  //       throw new ParamException(key + err)
  //     }
  //   }
  // }
  return async function validator (ctx: Koa.Context, next: Function) {
    next()
  }
}