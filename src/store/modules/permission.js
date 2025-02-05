import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('employee')) {
        var arr = []
        asyncRoutes.forEach((item)=>{
          if(item.hasOwnProperty('meta')){
            if(item.meta.hasOwnProperty('roles')){
              if(item.meta.roles.includes('employee')){
                arr.push(item)
              }
            }
          }
        })
        console.log(arr)
        accessedRoutes = arr || []
        // accessedRoutes = asyncRoutes || []
      } else if(roles.includes('guest')){
        var arr = []
        asyncRoutes.forEach((item)=>{
          if(item.hasOwnProperty('meta')){
            if(item.meta.hasOwnProperty('roles')){
              if(item.meta.roles.includes('guest')){
                arr.push(item)
              }
            }
          }
        })
        console.log(arr)
        accessedRoutes = arr || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
