import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Login,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/home',
			component: Home,
			meta: {
				requiresAuth: true
			},
			children: [{
				path: '',
				component: () => import('./components/DataPanel.vue'),
				meta: {
					requiresAuth: true
				}
				},{
				path: 'datalist',
				component: () => import('./components/DataList.vue'),
				meta: {
					requiresAuth: true
				}
				},{
				path: 'datapanel',
				component: () => import('./components/DataPanel.vue'),
				meta: {
					requiresAuth: true
				}		
			}]
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '*',
			redirect: '/',
			meta: {
				requiresAuth: false
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		//BUG beforeEach先于beforCreate执行
		console.log(store.state)
		if (!store.state.authorized) {
			next('/');
		}
	}
	next();
});

export default router;
