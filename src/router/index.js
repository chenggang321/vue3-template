import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let route = [
    {
        path:'/',
        name:'',
        component:() => import('@/views')
    }
]

const createRouter = () => new Router({
    routes: route,
    linkActiveClass: 'active'
})

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher
}

export default router
