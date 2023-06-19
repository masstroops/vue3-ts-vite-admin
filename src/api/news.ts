import request from "@/request"

export const getNewsList = (data: any) => {
  return request.post('/system/announcement/getList', data)
}
