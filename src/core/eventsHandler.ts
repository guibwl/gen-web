import {
    isFunction,
    isAsyncFunction,
    isGeneratorFunction,
    isString,
    isObject
} from '@/utils/typeCheck';

type Props = {
    [x: string]: any;
};

type Handler = {
    id: string,
    store: Props,
    state: Props,
    updateState: CallableFunction,
    updateEvents: CallableFunction,
    componentState: Props
};

// 捕获括号：async?, params?, content?
export const ARROW_FUNCTION_REGEX = /^\s*(async)?\s*\(([^\)]*)\)\s*=>\s*\{?([\s\S]*)/;
// 捕获括号：async?, fnName?, params?, content?
export const FUNCTION_REGEX = /^\s*(async)?\s*function\s*([^\(]*)\(([^\)]*)\)\s*\{([\s\S]*)/;

const PARAM_REGEX = /\s*,\s*/;

const CONTENT_TAILING_REGEX = /(\s*)\}?;?(\s*)$/g;

export const getNameFromFunctionStr = (str: string): string => str.trim();

export const getParamsFromFunctionStr = (str: string): string[] => str.trim().split(PARAM_REGEX)?.filter(Boolean);

export const getContentFromFunctionStr = (str: string): string => str.replace(CONTENT_TAILING_REGEX, () => '').trim();

const parseFunction = (str: string): Function => {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

    if (str.match(ARROW_FUNCTION_REGEX)) {
        const { $1, $2, $3 } = RegExp;
        const FunctionHandler = $1 === 'async' ? AsyncFunction : Function;
        const params = getParamsFromFunctionStr($2);
        const content = getContentFromFunctionStr($3);

        return new FunctionHandler(...params, content);
    }

    if (str.match(FUNCTION_REGEX)) {
        const { $1, $3, $4 } = RegExp;
        const FunctionHandler = $1 === 'async' ? AsyncFunction : Function;
        const params = getParamsFromFunctionStr($3);
        const content = getContentFromFunctionStr($4);

        return new FunctionHandler(...params, content);
    }

    return () => {};
}

const eventsHandler = ({
    store,
    state, 
    node,
}: Props) => {
    const enhancedEvents = node?.events;

    const componentsNodes = {
        [node.id]: node
    };

    if (isObject(state.__componentsNodes))
        Object.assign(componentsNodes, state.__componentsNodes);


    Reflect.defineProperty(state, '__componentsNodes', {
        value: componentsNodes,
        writable: true,
    });

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

    const handler: Handler = {
        id: node.id,
        store,
        state,
        componentState: node,
        updateState: updateStateEnhancer,
        updateEvents: updateEventsEnhancer,
    };

    for (const [key, value] of Object.entries(enhancedEvents)) {
        if (isString(value))
            enhancedEvents[key] =
                (...args: any) => parseFunction(value as string)(...args, handler);
        
        if (isFunction(value) || isAsyncFunction(value) || isGeneratorFunction(value))
            enhancedEvents[key] =
                (...args: any) => (value as Function)(...args, handler);
    }

    return enhancedEvents;
}

export default eventsHandler