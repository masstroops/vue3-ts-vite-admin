import request from "@/request"

export const getPermisson = (data?: any) => {
  return request.post('/getPermission', data)
}

export const login = (data: any) => {
  return request.post('/login', data)
}

export const getUser = () => {
  return request.get('/user/info')
}
