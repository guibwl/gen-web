import { h } from 'vue';
import parseFunction from '@/utils/parseFunction';
import { isString } from "@/utils/typeCheck";
import type { Props } from './interfaces';

// In here we handle some specific feature for component.
export default function componentsSchemaMiddleware(node: Props) {

    if (node.type === 'Table')
       return handleTableSchema(node);

    return node;
}

function handleTableSchema(node: Props) {

    const columns = node.props?.columns || [];

    columns.forEach((column: Props) => {
        if (column?.customRender && isString(column?.customRender)) {
            column.customRender = parseFunction(column?.customRender, {params: { h, node }});
        }
    })
    
    return node;
}