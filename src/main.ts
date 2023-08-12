import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import SvgIcon from '@/components/svg-icons/index.vue';

const app = createApp(App);

app.component('svgIcon', SvgIcon);

app.mount('#app');
