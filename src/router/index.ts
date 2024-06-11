import { createRouter,Router, createWebHistory, RouteRecordRaw } from 'vue-router';
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/index',
    component: () => import('../views/index.vue'),
    meta:{
        title:'首页'
    }
  },
];
const router: Router = createRouter({
   history:createWebHistory('/'),
  routes,
})
export default router