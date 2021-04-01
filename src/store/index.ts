import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

// define injection key
export const injectionKey: InjectionKey<Store<object>> = Symbol('Injection key');

export default createStore<object>({
  // 根 store 尽量不进行 CRUD 等操作
  // 请在 modules 中配置对应的模块，以进行独立的 CRUD
  modules: {},
});

// define your own `useStore` composition function
export function useStore() {
  return (baseUseStore as Function)(injectionKey);
}
