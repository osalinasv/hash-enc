const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/signup' },
		{ path: '/signup', component: SignUp},
		{ path: '/signin', component: SignIn},
	]
})

const app = new Vue({
	el: '#app',
	router,
});
