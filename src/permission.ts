import { useUserStore } from '@/store/user';
import { usePermissionStore } from './store/permission'
import router from './routers'
import { notification } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404'] // no redirect whitelist
const haveMap = ['/bigdata']

router.beforeEach((to:any, from:any, next:any) => {
  NProgress.start()
  // debugger
  if (localStorage.getItem('MY_ACCESS_TOKEN')) {
    let { getUserInfo, logout } = useUserStore()
    if (usePermissionStore().addRouters.length == 0) { // 判断首次进入
      getUserInfo()
      usePermissionStore().getPermisson().then(res => {
        // console.log(store.getters.addRouters, to)
        usePermissionStore().addRouters.forEach((route: any) => {
          router.addRoute(route)
        })
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          // set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          next({ path: redirect })
        }
      }).catch(err => {
        notification.error({
          message: "403",
          description: err.msg
        })
        logout()
        next({ path: '/404' })
      })
    } else {
      // 动态加载地图
      if (haveMap.includes(to.path) && !window.MAPLOAD) {
        addMapScript(to, from, next)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

// 动态加载地图方法
function addMapScript(to:any, from:any, next:any) {
  let _doc = document.getElementsByTagName('head')[0];
  let script = document.createElement('script') as any;
  script.setAttribute('type','text/javascript');
  script.setAttribute('src','https://webapi.amap.com/maps?v=1.4.15&key=fe378c431ed138afe3c08dc77a0d8dd5&plugin=Map3D,AMap.Scale,AMap.DistrictSearch,AMap.PolyEditor');
  _doc.appendChild(script);
  script.onload=script.onreadystatechange=function(){
    if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
      window.MAPLOAD = true
      next()
    }
    script.onload=script.onreadystatechange=null;
  }
}