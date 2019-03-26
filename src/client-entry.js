/* Main app entry point, used by webpack */

import { app, router } from './app'

router.onReady(() => {
  app.$mount('#app')
})
