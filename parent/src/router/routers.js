import HelloWorld from "../../../app1/src/components/HelloWorld";

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: HelloWorld
  },
  // {
  //   name: 'teacher',
  //   path: '/teacher'
  // },
  // {
  //   name: 'course',
  //   path: '/course'
  // },
  // {
  //   name: 'admin1',
  //   path: '/admin1'
  // }
]
