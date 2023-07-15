import { useLayouts } from "../composables/useLayouts"

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const { setLayout } = useLayouts()
  setLayout('login')
})