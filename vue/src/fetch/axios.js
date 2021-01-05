import axios from 'axios';
import qs from 'qs';
// import {Message} from 'element-ui';
import store from '@/store'

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api/'
}

axios.defaults.timeout = 5000;

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        token && (config.headers.Authorization = 'Bearer ' + token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    store.state.loginStatus = 'nologged'
                    break;
                default:
                    alert(error.response.data.msg)
                    break;
            }
        }
        return Promise.resolve(error.response)
    }
)

export function Get(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: param
        }).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function Post (url, params, headers) {
    params = headers ? params : qs.stringify(params)
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': headers || 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }