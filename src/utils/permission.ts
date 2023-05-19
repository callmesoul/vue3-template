import { router } from '@/router'

router.beforeEach(async (to, from, next) => {
  next()
})

router.beforeResolve(() => {})

// router.afterEach((to, from, failure) => {
//   console.log(window.history)
//   debugger
// })
