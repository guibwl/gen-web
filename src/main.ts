import { createApp } from 'vue'
import App from '@/App.vue'
import createRouterInstance from '@/router';
import store, { injectionKey } from '@/store';
import installAntd from './antd';

const router = createRouterInstance();

createApp(App)
    .use(installAntd)
    .use(store, injectionKey)
    .use(router)
    .mount('#app');
