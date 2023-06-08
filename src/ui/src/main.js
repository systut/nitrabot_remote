import Vue from 'vue';
import App from './App.vue';

// Import Bootstrap Vue
import {
	BootstrapVue,
	IconsPlugin,
	BootstrapVueIcons,
} from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.min.css';
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(IconsPlugin);

import router from './routes/routes';
import i18n from './plugins/i18n';

//import { NONE, ALL } from 'leaflet-freedraw';
Vue.config.productionTip = false;

new Vue({
	i18n,
	router,
	render: (h) => h(App),
}).$mount('#app');
