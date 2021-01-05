import {Get, Post} from './axios'

export const GetOrderList = (params) => {
  return Get('order/public/list', params)
}

export const GetOrderDetail = (params) => {
  return Get('order/public/detail', params)
}

export const ChangeStatus = (params) => {
  return Post('order/public/changeStatus', params, "application/json")
}