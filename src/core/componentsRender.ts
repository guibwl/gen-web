import {
  AsyncComponentLoader,
  defineAsyncComponent,
  VNode,
  ref,
  h,
} from "vue";
import { camelCase } from "change-case";
import { isObject, isString } from "@/utils/typeCheck";
import componentsImporter from "@/components/index";
import eventsHandler, { markUpdatesFn } from "./eventsHandler";
import componentsSchemaMiddleware from './componentsSchemaMiddleware';
import type { Props } from './interfaces';

const componentsLoadCache: Props = {};

export const markRelatedNode = () => {
  const parentNodes: Props[] = [];
  
  return (node: Props) => {
    const [parentNode = null] = parentNodes;

    Reflect.defineProperty(node, "parentNode", {
      value: parentNode,
    });
  
    if (Array.isArray(node?.children) && node.children.length) {
      const firstChild = node.children[0];
      const lastChild = node.children[node.children.length - 1];
  
      Reflect.defineProperty(node, "firstChild", {
        value: firstChild,
      });
  
      Reflect.defineProperty(node, "lastChild", {
        value: lastChild,
      });
  
      parentNodes.unshift(node);
    }
  
    if (node.parentNode?.lastChild === node) {

      const [ parentNode ] = parentNodes;

      // The `parentNode` may just did `unshift` in above,
      // so here we need to delete second `parentNodes`.
      if (parentNode === node)
          parentNodes.splice(1, 1);
      else
          parentNodes.shift();
    }
    
    return node;
  }
};

const markComponentsNodes = (node: Props, state: Props) => {

  const componentsNodes = {
    [node.id]: node
  };

  if (isObject(state.__componentsNodes))
      Object.assign(componentsNodes, state.__componentsNodes);


  Reflect.defineProperty(state, '__componentsNodes', {
      value: componentsNodes,
      writable: true,
  });
}

const propsEnhancer = ({ node }: Props): Props => {

  // Convert to ref, it makes UI can update by state.
  node.props = ref(node.props).value;

  const props = {};

  if (isObject(node?.props))
    Object.assign(props, node?.props);

  if (isObject(node?.events))
    Object.assign(props, eventsHandler({ node }));

  return props;
}

const defineAntdComponent = (node: Props, props: Props, typeNameCamelCase: string) => {
  const Comp =
    componentsLoadCache[typeNameCamelCase] ||
    (componentsLoadCache[typeNameCamelCase] = defineAsyncComponent(
      componentsImporter[typeNameCamelCase] as AsyncComponentLoader
    ));

  Reflect.defineProperty(node, "__component", {
    value: {
      props,
      value: Comp,
    },
    writable: true,
  });
}

const defineAntdSubComponent = (node: Props, props: Props, typeNameOrigin: string) => {
  const typeItems = typeNameOrigin.split(".");
  const [typeName, childTypeName] = typeItems;
  const typeNameCamelCase = camelCase(typeName);

  const comp = async () =>
    (await componentsImporter[typeNameCamelCase]()).default[childTypeName];

  const Comp: any =
    componentsLoadCache[typeNameOrigin] ||
    (componentsLoadCache[typeNameOrigin] = defineAsyncComponent(
      comp as AsyncComponentLoader
    ));

  Reflect.defineProperty(node, "__component", {
    value: {
      props,
      value: Comp,
    },
    writable: true,
  });
}

const defineNormalComponent = (node: Props, props: Props, typeNameOrigin: string) => {
  const Comp = typeNameOrigin;

  Reflect.defineProperty(node, "__component", {
    value: {
      props,
      value: Comp,
    },
    writable: true,
  });
}

const componentsGenerator = (node: Props, props: Props,) => {
  const typeNameOrigin = node?.type;
  const typeNameCamelCase = camelCase(typeNameOrigin);

  if (componentsImporter[typeNameCamelCase]) {

    defineAntdComponent(node, props, typeNameCamelCase);

  } else if (typeNameOrigin.match(/^[A-Z][\S]+\.[\S]+/)) {

    defineAntdSubComponent(node, props, typeNameOrigin);
  } else {

    defineNormalComponent(node, props, typeNameOrigin);
  }
}

const leafNodeHandler = (node: Props, componentsContainer: VNode[]) => {

  const child = node?.children;

  if (
    !child?.length ||
    typeof child === 'string'
  ) {
    const Comp = node?.__component?.value;
    const props = node?.__component?.props;
    const _child = typeof child !== 'string' ? undefined : typeof Comp === 'string' ? child : () => child;

    Reflect.defineProperty(node, "__component", {
      value: h(Comp, props, _child),
      writable: true,
    });

    let parentNode = node.parentNode;
    let currentNode = node;

    if (parentNode)
      (
        parentNode.__component_children ||
        (parentNode.__component_children = [])
      ).push(currentNode.__component);

    while (parentNode) {
      if (parentNode.lastChild === currentNode) {
        const { props, value: Comp } = parentNode.__component;
        const children = parentNode.__component_children.slice();
        const parentComponent = h(
          Comp,
          props,
          typeof Comp === 'string' ? children : () => children
        );

        Reflect.defineProperty(parentNode, "__component", {
          value: parentComponent,
          writable: true,
        });

        if (!parentNode.parentNode)
          componentsContainer.push(parentNode?.__component);

        currentNode = parentNode;
        parentNode = parentNode.parentNode;

        if (parentNode)
          (
            parentNode.__component_children ||
            (parentNode.__component_children = [])
          ).push(currentNode.__component);

      } else {
        parentNode = null;
      }
    }

    if (!node?.parentNode) componentsContainer.push(node?.__component);
  }
}

export const loopDFS = (nodes: Props[], cb: CallableFunction) => {
  nodes = [...nodes];
  let n = 0;
  while (nodes.length) {
    const node: Props = nodes.shift() || {};
    if (Array.isArray(node?.children) && node.children.length)
      nodes.unshift(...node.children);
    
    cb(node, n++, nodes);
  }
}

const componentsRender = ({
  store,
  state,
}: Props) => {
  const componentsSchema = state?.schema;
  const componentsKeys: string[] = [];

  const componentsFactory = (schema: Props[]): VNode[] => {
    const componentsContainer: VNode[] = [];
    const markRelatedNodeInstance = markRelatedNode();

    loopDFS(schema, (node: Props) => {

        if (!node?.id)
          throw new Error(`expect 'id' property in each node inside the 'schema'.`);
        
        if (!isString(node?.id))
          throw new Error(`expect 'id' property as a string in node inside the 'schema', but got ${node?.id}.`);

        markRelatedNodeInstance(node);

        markComponentsNodes(node, state);

        markUpdatesFn({
          node,
          store,
          state,
        });

        const props = propsEnhancer({ node });

        node = componentsSchemaMiddleware(node);

        componentsGenerator(node, props);

        Reflect.defineProperty(node, "__component_children", {
          value: null,
          writable: true,
        });

        leafNodeHandler(node, componentsContainer);

        componentsKeys.push(node.id);
    });

    return componentsContainer;
  };

  const result = componentsFactory(componentsSchema);

  checkIdDuplicate(componentsKeys);

  return result;
};

export default componentsRender;


function checkIdDuplicate(componentsKeys: string[]) {
  // Use setTimeout will not block the thread.
  setTimeout(checkIdDuplicateExecute, 10, componentsKeys);
}

export function checkIdDuplicateExecute(componentsKeys: string[]) {
    
  const uniqueKeys: string[] = []
  let duplicatedKey: string | undefined;
  for (let i = 0; i < componentsKeys.length; i++) {

    if (uniqueKeys.indexOf(componentsKeys[i]) !== -1) {
      duplicatedKey = componentsKeys[i];
      break;
    }

    uniqueKeys.push(componentsKeys[i]);
  }

  if (duplicatedKey !== undefined)
     throw new Error(`Component id in 'schema' should be unique, but got '${duplicatedKey}' which is duplicated.`);
}