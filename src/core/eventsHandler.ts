import {
    isFunction,
    isAsyncFunction,
    isGeneratorFunction,
    isString,
} from '@/utils/typeCheck';
import parseFunction from '@/utils/parseFunction';
import type { Props } from './interfaces';

const eventsHandler = ({
    node,
}: Props) => {
    const enhancedEvents = node?.events;

    for (const [key, value] of Object.entries(enhancedEvents)) {
        if (isString(value))
            enhancedEvents[key] =
                (...args: any) => parseFunction(value as string)(...args, node);
        
        if (isFunction(value) || isAsyncFunction(value) || isGeneratorFunction(value))
            enhancedEvents[key] =
                (...args: any) => (value as Function)(...args, node);
    }

    return enhancedEvents;
}

export default eventsHandler;


export const markUpdatesFn = ({
    store,
    state, 
    node,
}: Props) => {
    const updateStateEnhancer = (props: unknown, id?: string): unknown => {

        if (id && !isString(id))
            throw new Error(`expect id for updateEvents should be a string, but got ${typeof id}`);

        if (id)
            return Object.assign(state.__componentsNodes[id].props, props);

        return Object.assign(node.props, props);
    };

    const updateEventsEnhancer = (events: unknown, id?: string): unknown => {

        if (id && !isString(id))
            throw new Error(`expect id for updateEvents should be a string, but got ${typeof id}`);

        if (id) {
            return Object.assign(state.__componentsNodes[id].events, events);
        }

        return Object.assign(node.events, events);
    };

    const updateChildrenEnhancer = (children: unknown, id?: string): unknown => {

        if (id && !isString(id))
            throw new Error(`expect id for updateEvents should be a string, but got ${typeof id}`);

        if (id) {
            return state.__componentsNodes[id].children = children;
        }

        return node.children = children;
    };

    Reflect.defineProperty(node, 'store', { value: store });
    Reflect.defineProperty(node, 'state', { value: state });
    Reflect.defineProperty(node, 'updateState', { value: updateStateEnhancer });
    Reflect.defineProperty(node, 'updateEvents', { value: updateEventsEnhancer });
    Reflect.defineProperty(node, 'updateChildren', { value: updateChildrenEnhancer });
}