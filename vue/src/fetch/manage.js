import {Get, Post} from './axios'

// 登录
export const Login = (params) => {
  return Post('manage/public/login', params, "application/json")
}

// 注册
export const Register = (params) => {
  return Post('manage/public/register', params, "application/json")
}

// 用户表
export const GetUserList = (params) => {
  return Get('manage/getuserlist', params)
}

export const PostUserPsd = (params) => {
  return Post('manage/updatePsd', params, "application/json")
}

// 用户信息
export const GetUser = (params) => {
  return Get('manage/getuser', params)
}

// 角色表
export const GetRoleList = (params) => {
  return Get('manage/getrolesList', params)
}

export const PostRoleFrom = (params) => {
  return Post('manage/updateRole', params, "application/json")
}

export const DeleteRole = (params) => {
  return Post('manage/deleteRole', params, "application/json")
}

// 路由表
export const GetRouteList = (params) => {
  return Get('manage/getRouterList', params)
}

export const GetAllParentRouterList = (params) => {
  return Get('manage/getAllParentRouterList', params)
}

export const PostRouteFrom = (params) => {
  return Post('manage/updateRouter', params, "application/json")
}

export const DeleteRoute = (params) => {
  return Post('manage/deleteRouter', params, "application/json")
}