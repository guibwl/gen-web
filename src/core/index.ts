import {
  defineComponent,
  toRefs,
} from "vue";
import _ from 'lodash';
import componentsRender from './componentsRender';
import type { Props } from './interfaces';

const store: Props = {};

const createScope = (data: Props, formId?: string) => {
    const state = _.cloneDeep(data);

    if (formId && typeof formId === 'string')
        store[formId] = state;

    return {
        state,
        store,
    }
}


export default defineComponent({
  props: {
    data: {
        type: Object,
        default: {},
    },
    id: {
        type: String,
        default: '',
    },
  },
  setup(props) {
      
    const { data, id } = toRefs<Props>(props);

    // Store ready for the components.
    const {
        store,
        state,
    } = createScope(data.value, id.value);
    
    return () => componentsRender({
        store,
        state,
    });
  },
});