import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/a'
  },
  {
    path: '/a',
    name: 'pageA',
    meta: {
      title: 'A',
    },
    component: () => import(/* webpackChunkName: "A" */ '../views/pagea'),
  }
];
function historyStatePatcher(to: any, from: any) {
    if (!window.history.state?.current) {
      const state = {
        ...window.history.state,
        back: from.path,
        current: to.path,
        position: NaN,
        replaced: false,
        scroll: null,
        selfFix: true,
      };
  
      const url = window.location.origin + window.location.pathname + window.location.search + window.location.hash;
  
      window.history.replaceState(state, document.title, url);
    }
}

const createRouterInstance = () => {
  const router = createRouter({
    history: createWebHistory(''),
    routes,
  });
  
  router.beforeEach((to, from) => {
    historyStatePatcher(to, from);
    return true;
  });

  router.onError(console.warn);

  return router;
};


export default createRouterInstance;
