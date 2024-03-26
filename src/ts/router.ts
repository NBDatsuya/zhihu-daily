import {createRouter,  createWebHistory} from "vue-router";

export const routes = [
    {
        path: '/home',
        alias: ['/', '/index', '/main'],
        component: import("../pages/Home.vue"),
        meta: {
            title: "首页 - 知乎日报阅读器"
        }
    },
    {
        path: '/about',
        component: () => import("../pages/About.vue"),
        meta: {
            title: "关于 - 知乎日报阅读器"
        }
    },
    {
        path: '/article/:id',
        params:["id"],
        component: () => import("../pages/Article.vue"),
        meta: {
            title: "文章 - 知乎日报阅读器"
        }
    },
]

const instance = createRouter({
    history:  createWebHistory(),
    routes: routes,
})

instance.beforeEach((to,
                     _,
                     next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title.toString()
    }
    next(true)
})

export default instance