import 'es6-promise/auto'
import Vue from 'vue'
import store from '../../../src/vuex/index.js'
import VueRouter from 'vue-router'
import Status from '../../../src/theme/Status.vue'

describe('Status.vue', () => {
  it('should get correct initial values', done => {
    Vue.use(VueRouter)

    const router = new VueRouter({
      routes: [
        { path: '/', component: Status }
      ]
    })

    const vm = new Vue({
      el: document.createElement('div'),
      router,
      store,
      render: h => h('router-view')
    })
    expect(vm.$el.querySelector('[data-server-uptime]')
      .textContent).to.equal('00:00:00')
    expect(vm.$el.querySelector('[data-reqcount]')
      .textContent).to.equal('0')
    done()
  })
})
