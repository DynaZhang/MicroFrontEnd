export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home')
  },
  {
    path: '/page1',
    name: 'page1',
    component: () => import('../pages/page1')
  }
]
