import axios from 'axios'


export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}

// 这部分是本来前端就该有的东西
export const getData = ()=>{
  return axios.request({
    url:'/home/getData'
  })
}

// 前端 请求写的地方 
export const getUser = (params) =>{
  return axios.request({
    url:'/user/getUser',
    method:'get',
    params
  })
}

