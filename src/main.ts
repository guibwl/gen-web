import { createApp } from 'vue'
import App from '@/App.vue'
import createRouterInstance from '@/router';
import store, { injectionKey } from '@/store';

const router = createRouterInstance();

createApp(App)
    .use(store, injectionKey)
    .use(router)
    .mount('#app');
