import { defineStore } from 'pinia'
import { getPermisson as getPer } from "@/api/user"
import { routes } from "@/routers/index"
// Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.
// 这里引入markRaw是为了解决上面的警告，因为这里将动态生成的路由的component会被包装厂响应式对象，vue建议这样会造成增加性能开销
import { markRaw, ref } from 'vue'

export const usePermissionStore = defineStore('permissionStore', () => {
  const addRouters = ref<any[]>([])

  const getPermisson = () => {
    return new Promise((resolve, reject) => {
      // let data = mockRoute().data.menuList

      getPer().then(res => {
        if (res.success) {
          let data = res.data.menuList
          if (data.length !== 0) {
            GenerateServerRoutes(data).then(res => {
              resolve(res)
            }).catch(err => {
              err.msg = '生成服务端路由出错'
              reject(err)
            })
          } else {
            res.msg = '没有权限'
            reject(res)
          }
        }
      })

      // commit('SET_PERMISSION')
      // if (data.length !== 0) {
      //   dispatch('GenerateServerRoutes',data).then(res => {
      //     resolve(res)
      //   }).catch(err => {
      //     err.msg = '生成服务端路由出错'
      //     reject(err)
      //   })
      // } else {
      //   res.msg = '没有权限'
      //   reject(res)
      // }
    })
  }

  const SET_SERVER_ROUTERS = (myRouters: any) => {
    let cRoutes = window.deepCopy(routes)
    cRoutes[0].children = myRouters
    cRoutes[0].component = markRaw(cRoutes[0].component)
    addRouters.value = [...cRoutes]
  }

  const GenerateServerRoutes = (data: any) => {
    return new Promise(resolve => {
      let serverRouters: any[] = []
      routes[0]?.children?.forEach((item: any) => {
        data.forEach((sItem: any) => {
          // 权限匹配
          if (item.meta.permission.includes(sItem.menuCode)) {
            let obj = {
              path: item.path,
              name: item.name,
              meta: item.meta,
              component: markRaw(item.component),
              redirect: item.redirect,
            }
            serverRouters.push(obj)
            // 递归子模块
            if (item.children && sItem.childMenus) {
              filterRouter(obj, item.children, sItem.childMenus)
            }
          }
        })
      })
      
      console.log(serverRouters)
      SET_SERVER_ROUTERS(serverRouters)
      resolve(serverRouters)
    })
  }

  /**
 * 过滤账户是否拥有某一个权限
 *
 * @param parent
 * @param routerList
 * @param route
 */
  function filterRouter(parent:any, routerMap:any, roles:any) {
    routerMap.forEach((item:any) => {
      roles.forEach((sItem:any) => {
        if (item.meta.permission.includes(sItem.menuCode)) {
          let obj = {
            path: item.path,
            name: item.name,
            meta: item.meta,
            component: markRaw(item.component),
            hidden: item.hidden,
          }
          if (!parent.children) {
            parent.children = []
            parent.children.push(obj)
          } else parent.children.push(obj);

          if (item.children && sItem.childMenus) filterRouter(obj, item.children, sItem.childMenus)
        }
      })
    })
  }

  return {
    addRouters,
    getPermisson,
  }
})