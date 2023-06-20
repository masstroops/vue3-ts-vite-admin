// import { createRouter, createWebHistory } from 'vue-router'
import * as Router from 'vue-router'
import Layout from '@components/layout/index.vue'
import RouterView from "@components/layout/RouterView.vue";

//Create a router and then export it

const routes:Array<Router.RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/page1',
    children: [
      {
        path: '/page1',
        component: () => import('@pages/page1/page.vue'),
        name: 'page1',
        meta: { title: '汇总视图', icon: 'home-outlined', permission: ['Bghome'] }
      },
      {
        path: '/itemManage',
        name: 'itemManage',
        component: () => import('@pages/itemManage/itemManage.vue'),
        meta: { title: '项目管理', icon: 'pie-chart-filled', permission: ['dayiManage'] }
      },
      {
        path: '/page2',
        name: 'page2',
        component: RouterView,
        meta: { title: '数据中心', icon: 'pie-chart-filled', permission: ['order']  },
        children: [
          {
            path: '/page2/page',
            name: 'orderManage',
            component: () => import('@pages/page2/page2.vue'),
            meta: { title: '订单管理', permission: ['orderManage'] }
          }
        ]
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('@pages/page3/page.vue'),
        meta: { title: '样品检测', icon: 'pie-chart-filled', permission: ['dayiManage'] }
      },
      {
        path: '/page4',
        name: 'page4',
        component: RouterView,
        meta: { title: '电镜预约', icon: 'dollar-circle-filled', permission: ['user'] },
        children: [
          {
            path: '/page4/page2',
            name: 'userManage',
            component: () => import('@pages/page4/page2.vue'),
            meta: { title: '用户管理', permission: ['userManage'] }
          },
          {
            path: '/page4/page3',
            name: 'role',
            component: () => import('@pages/page4/page3.vue'),
            meta: { title: '权限管理', permission: ['role'] }
          },
        ]
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap:Array<Router.RouteRecordRaw> = [
  //Path  6 Component are mandatory
  {
    path: "/",
    redirect: '/page1'
  },
  
  {
    path: '/login',
    name: 'login',
    component: () => import('@pages/login/login.vue')
  },
];


const router = Router.createRouter({
  history: Router.createWebHistory(),//webHash history will  add hash before every route
  routes: constantRouterMap, //Send the routes here.
})


export default router
export {
  routes,
}