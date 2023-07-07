const c1 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/borisbrue/Projects/ZSP/gyutoFrontendPlugins/gridsome-source-gyuto/node_modules/gridsome/app/pages/404.vue")

export default [
  {
    name: "404",
    path: "/404/",
    component: c1
  },
  {
    name: "*",
    path: "*",
    component: c1
  }
]
