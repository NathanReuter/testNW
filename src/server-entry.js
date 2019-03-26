/* Server entry file, use by webpack when compiling first app files
 * to prevent to display an empty html body in the first request */

import { app, router, store } from './app'

export default context => {
  router.push(context.url)
  /* This function loop thought allComponents in the current route
  * and called the ones that has the asyncDate with the initialized router
  * and store.
  * -> But by the simplicity of the application, this code is not used yet */
  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.asyncData) {
      return component.asyncData(store, router.currentRoute)
    }
  })).then(() => {
    context.initialState = store.state
    return app
  })
}
