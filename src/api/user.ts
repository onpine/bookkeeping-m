import request from '@/utils/request'

export const login = (data: any) => {
  return request({
    method: "POST",
    url: "/login",
    // data用来设置POST请求体
    data
  })
};
export const rigister = (data: any) => {
  return request({
    method: "POST",
    url: "/rigister",
    // data用来设置POST请求体
    data
  })
};