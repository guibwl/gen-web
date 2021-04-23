
export const adminBpsMock = {
    schema: [
        {
            type: 'Typography.Title',
            id: 'Typography-00',
            children: '搭建示例',
        },
        {
            type: 'Divider',
            id: 'Divider-0',
            props: {
                orientation: "left"
            },
            children: '这是一根分割线',
        },
        {
            type: 'Typography.Text',
            id: 'Typography-01',
            children: '购买总数: 12',
            props: {
                style: { marginRight: '10px', marginBottom: '10px' }
            }
        },
        {
            type: 'Typography.Text',
            id: 'Typography-02',
            children: '支付总数: 8',
            props: {
                style: { marginRight: '10px', marginBottom: '10px' }
            },
            events: {
                onClick: `(...args) => {
                    const [node] = args.slice(-1);

                    console.log(node);
                }`
            }
        },
        {
            type: 'Table',
            id: 'Table-00',
            props: {
                style: { minWidth: '100%' },
                dataSource: [
                    {
                        key: '1',
                        name: '胡彦斌',
                        age: 32,
                        address: '西湖区湖底公园1号',
                    },
                    {
                        key: '2',
                        name: '胡彦祖',
                        age: 42,
                        address: '西湖区湖底公园1号',
                    },
                ],
                columns: [
                    {
                        title: '姓名',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '年龄',
                        dataIndex: 'age',
                        key: 'age',
                    },
                    {
                        title: '住址',
                        dataIndex: 'address',
                        key: 'address',
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        customRender: `(recode, ...args) => {
                            const [h, node] = args.slice(-2);
                            
                            return h('a', {onClick: () => console.log(recode, node)}, '执行')
                        }`
                    }
                ],
            }
        },
        {
            type: 'Select',
            id: 'Select-00',
            props: {
                allowClear: true,
                showSearch: true,
                placeholder: '请选择',
                style: { minWidth: '100px', marginRight: '10px'}
            },
            children: [
                {
                    type: 'Select.Option',
                    id: 'Select.Option-00',
                    props: {
                        children: 'jack',
                        value: 'jack'
                    }
                },
                {
                    type: 'Select.Option',
                    id: 'Select.Option-01',
                    props: {
                        children: 'lucy',
                        value: 'lucy'
                    }
                }
            ]
        },
        {
            type: 'div',
            id: 'div-00',
            props: {
                style: {
                    with: '100px', marginRight: '10px'
                },
            },
            children: [
                {
                    type: 'Input',
                    id: 'input-00',
                    props: {
                        placeholder: '请输入'
                    },
                    events: {
                        onChange: `(e, ...arg) => {
                            const [node] = arg.slice(-1);
                            const {updateState, updateChildren} = node;
                            updateChildren(\`支付总数: $\{e.target.value\}\`, 'Typography-02');
                            updateState({value: e.target.value, placeholder: '请再次输入'});
                        }`
                    },
                }
            ]
        },
        {
            type: 'InputNumber',
            id: 'InputNumber-00',
            props: {
                min: 1,
                max: 10,
                defaultValue: 1,
                style: { marginRight: '10px' }
            },
            events: {
                onChange: `(value, ...args) => {
                    const [node] = args.slice(-1);
                    node.updateState({value});
                }`,
                formatter: `(value) => \`\${(+value).toFixed(2)}%\`;`,
                parser: "(value) => value.replace('%', '')"
            }
        },
        {
            type: 'DatePicker',
            id: 'DatePicker-00',
            props: {
                placeholder: '请选择',
            }
        },
        {

            type: 'div',
            id: 'div-01',
            props: {
                style: {
                    width: '100%',
                },
            },
            children: [
                {
                    type: 'Input.TextArea',
                    id: 'Textarea-00',
                    props: {
                        placeholder: '请输入',
                        style: {
                            width: '100%', marginTop: '10px'
                        },
                    },
                    events: {
                        onChange: `(e, ...args) => {
                            const [node] = args.slice(-1);
                            node.updateChildren(\`支付总数: $\{e.target.value\}\`, 'Typography-02')
                            node.updateState({value: e.target.value, placeholder: '请再次输入'});
                        }`
                    }
                }
            ]
        }
    ]
}