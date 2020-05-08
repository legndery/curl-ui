import Vue from 'vue';

import {
	MdButton,
	MdContent,
	MdTabs,
	MdToolbar,
	MdIcon,
	MdSnackbar,
	MdField,
	MdCheckbox,
	MdAutocomplete,
	MdMenu,
	MdList,
	MdDrawer
} from 'vue-material/dist/components';
import VueCodeMirror from 'vue-codemirror-lite';
import 'vue-material/dist/vue-material.min.css';

require('codemirror/addon/display/autorefresh');
require('codemirror/mode/javascript/javascript');

[
	VueCodeMirror,
	MdButton,
	MdContent,
	MdTabs,
	MdToolbar,
	MdIcon,
	MdSnackbar,
	MdField,
	MdCheckbox,
	MdAutocomplete,
	MdMenu,
	MdList,
	MdDrawer
].forEach(c => Vue.use(c));

import router from './router';
import store from './store';
import app from './app.vue';


const APP = new Vue({
	el: '#fetcher-app',
	router,
	store,
	render: h => h(app)
});

if (!IS_PROD) {
	window.FETCHER_APP = APP;
}