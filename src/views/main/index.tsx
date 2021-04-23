import {
  defineComponent,
} from 'vue';
import style from './style.module.scss';
import Core from '@/core'
import { adminBpsMock } from './mock';

export default defineComponent({
  setup() {
    return () => <div class={style.content}>
      <Core data={adminBpsMock} id='xxx1' />
    </div>
  }
});
