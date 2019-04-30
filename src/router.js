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
		},{
			path: '/404',
			component: () => import('./views/404.vue'),
			meta: {
				requiresAuth: false
			}
		},{
			path: '/error/:msg',
			component: () => import('./views/Error.vue'),
		},{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				requiresAuth: false
			}
		},{
			path: '/home',
			component: Home,
			meta: {
				requiresAuth: true,
				authorization: 'user'
			},
			children: [{
					path: '',
					component: () => import('./components/Device.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'user'
					}
				},{
					path: 'realtime/:address',
					component: () => import('./components/Realtime.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'user'
					}		
				}, {
					path: 'history/:address',
					component: () => import('./components/History.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'user'
					}
				}, {
					path: 'deviceManage',
					component: () => import('./components/DeviceManage.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'admin'
					}
				}, {
					path: 'userManage',
					component: () => import('./components/UserManage.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'admin'
					}
				}, {
					path: 'addDevice',
					component: () => import('./components/AddDevice.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'admin'
					}
				}, {
					path: 'addUser',
					component: () => import('./components/AddUser.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'admin'
					}
				}, {
					path: 'addMonitorData',
					component: () => import('./components/AddMonitorData.vue'),
					meta: {
						requiresAuth: true,
						authorization: 'admin'
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
			redirect: '/404',
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
			next('/error/用户尚未登录');
		}
		if (to.meta.authorization === 'admin') {
			if(sessionStorage.getItem('authorization') !== 'admin') {
				next('/error/用户权限错误');
			}
		}
	}
	next();
});

router.afterEach(() => {
	store.commit('hideLoading');
});

export default router;
