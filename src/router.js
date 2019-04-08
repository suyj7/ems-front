import Vue from 'vue'
import store from './store';
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: '/login'
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
					component: () => import('./components/Device.vue'),
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
					path: 'city/:name',
					component: () => import('./components/Realtime.vue'),
					meta: {
						requiresAuth: true
					}		
				}, {
					path: 'history',
					component: () => import('./components/History.vue'),
					meta: {
						requiresAuth: true
					}
				}]
		},
		//{
			//path: '/about',
			//name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			//component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
			//meta: {
			//	requiresAuth: false
			//}
		//},
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
	store.commit('showLoading');
	if (to.meta.requiresAuth) {
		if (!sessionStorage.getItem('authorized')) {
			next('/');
		}
	}
	next();
});

router.afterEach(() => {
	store.commit('hideLoading');
});

export default router;
