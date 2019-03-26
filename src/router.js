import Vue from 'vue'
import VueRouter from 'vue-router'
import Status from './theme/Status.vue'
import Certification from './theme/Certification.vue'
import NotFound from './theme/NotFound.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    { path: '/certification/:id', name: 'certification', component: Certification },
    { path: '/', redirect: '/certification/cpf' },
    { path: '/status', name: 'status', component: Status },
    { path: '*', component: NotFound }
  ]
})

export default router
