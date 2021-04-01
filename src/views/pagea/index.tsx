import {
  defineComponent,
} from 'vue';
import style from './style.module.scss';

export default defineComponent({
  setup() {
    return () => <div class={style.content}>
      page-a
      <a-button type="primary">Button</a-button>
    </div>
  }
});
