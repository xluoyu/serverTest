import {Get, Post} from './axios'

export const Login = (params) => {
  return Post('manage/public/login', params, "application/json")
}

export const Register = (params) => {
  return Post('manage/public/register', params, "application/json")
}

export const GetUserList = (params) => {
  return Get('manage/getuserlist', params)
}

export const GetUser = (params) => {
  return Get('manage/getuser', params)
}

export const GetRoleList = (params) => {
  return Get('manage/getrolesList', params)
}