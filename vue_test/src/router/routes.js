import About from '../page/About'
import Home from '../page/Home'

export function createRoutes(routes = [], backstageRoutes = []) {
    routes.push({
        name:"about",
        path: '/about',
        component: About,
        children: backstageRoutes,
        meta: {
            isAuth: true,
            title: '关于'
        }
    })

    routes.push({
        name:"home",
        path: '/home',
        component: Home,
        children: backstageRoutes,
        meta:{isAuth:true,title:'首页'}
    })
    return routes
}
export default createRoutes()