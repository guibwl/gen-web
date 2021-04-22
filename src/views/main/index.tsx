import {
  defineComponent,
} from 'vue';
import style from './style.module.scss';
import Core from '@/core'

const MOCK_DATA = {
  schema: [
    {
      type: 'div',
      id: 'div-00',
      props: {
        style: { minWidth: '100px' }
      },
      children: [
        {
          type: 'div',
          id: 's-00',
          props: {
            style: { minWidth: '100px' }
          },
          children: [
            {
              type: 'div',
              id: 's-001',
              props: {
                style: { minWidth: '100px' }
              },
              children: `3-坎坎坷坷-1`
            },
            {
              type: 'span',
              id: 's-012',
              props: {
                style: { minWidth: '100px' }
              },
              children: [
                {
                  type: 'div',
                  id: 's-0013',
                  props: {
                    style: { minWidth: '100px' }
                  },
                  children: [
                    {
                      type: 'div',
                      id: 's-0014',
                      props: {
                        style: { minWidth: '100px' }
                      },
                      children: `5-坎坎坷坷-4`,
                      events: {
                        onClick: `() => {
                          console.log('>>>> go')
                        }`
                      }
                    },
                    {
                      type: 'span',
                      id: 's-0124',
                      props: {
                        style: { minWidth: '100px' }
                      },
                      children: `5-spany-4`
                    }
                  ]
                },
                {
                  type: 'span',
                  id: 's-0123',
                  props: {
                    style: { minWidth: '100px' }
                  },
                  children: `4-spany-3`
                }
              ]
            }
          ]
        },
        {
          type: 'span',
          id: 's-01',
          props: {
            style: { minWidth: '100px' }
          },
          children: `2-123`
        }
      ]
    },
    {
      type: 'Row',
      id: 'row-00',
      props: {
        justify: 'start',
        gutter: [50, 50],
        type: 'flex',
        style: { margin: 0 }
      },
      children: [
        {
          type: 'Col',
          id: 'col-00',
          props: {
            span: 6,
            order: 0,
            offset: 6,
            style: {
              backgroundColor: '#eff5ff'
            }
          },
          children: [
            {
              type: 'span',
              id: 'c-span-00',
              children: 'col-1',
              props: {
                style: {
                  backgroundColor: '#d6e3ff'
                }
              }
            }
          ]
        },
        {
          type: 'Col',
          id: 'col-02',
          props: {
            span: 6,
            offset: 6,
            style: {
              backgroundColor: '#f1eeff'
            }
          },
          children: [
            {
              type: 'span',
              id: 'c-span-02',
              children: 'col-2',
              props: {
                style: {
                  backgroundColor: '#ddd6ff'
                }
              }
            }
          ]
        }
      ]
    },
    {
      type: 'Row',
      id: 'row-01',
      props: {
        justify: 'start',
        gutter: [50, 50],
        type: 'flex',
        style: { margin: 0 }
      },
      children: [
        {
          type: 'Col',
          id: 'col-01',
          props: {
            span: 6,
            style: {
              backgroundColor: '#eff5ff'
            }
          },
          children: [
            {
              type: 'Input',
              id: 'input-00',
              props: {
                placeholder: 'xxx',
                value: 'xxx-'
              },
              events: {
                onChange: `(e, ...arg) => {
                  const [handler] = arg.slice(-1);
                  const {updateState, updateEvents} = handler;
                  updateState({value: e.target.value, placeholder: '===',}, 'input-01');
                  updateState({value: e.target.value, placeholder: '==='});
                  console.log('handler >', handler);
                }`
              },
            }
          ]
        },
        {
          type: 'Col',
          id: 'col-04',
          props: {
            span: 6,
            style: {
              backgroundColor: '#ffeee3'
            }
          },
          children: [
            {
              type: 'Select',
              id: 'select-00',
              props: {
                placeholder: '请选择',
                value: undefined,
                allowClear: true,
                style: {minWidth: '100%'}
              },
              events: {
                onChange: `(value, ...arg) => {
                  const [handler] = arg.slice(-1);
                  const {updateState, updateEvents} = handler;
                  updateState({value});
                  console.log('handler >', handler, value);
                }`
              },
              children: [
                {
                  type: 'SelectOption',
                  id: 'select-option-001',
                  props: {
                    key: '0',
                    value: 'kk-xxx-',
                    children: '2天天-xxx-',
                  },
                },
                {
                  type: 'SelectOption',
                  id: 'select-option-002',
                  props: {
                    key: '1',
                    value: 'kk-uuu-',
                    children: '9天天-xxx-',
                  },
                }
              ]
            }
          ]
        },
        {
          type: 'Col',
          id: 'col-03',
          props: {
            span: 6,
            style: {
              backgroundColor: '#f1eeff'
            }
          },
          children: [
            {
              type: 'Input',
              id: 'input-01',
              props: {
                placeholder: 'xxx',
                defaultValue: 'tes000---',
              },
              events: {
                onChange: `(e, ...arg) => {
                  const [handler] = arg.slice(-1);
                  const {updateState, updateEvents} = handler;
                  updateState({value: e.target.value, placeholder: '===',});
                  console.log('handler >', handler);
                }`
              },
            },
          ]
        },
        {
          type: 'Col',
          id: 'col-07',
          props: {
            span: 6,
            style: {
              backgroundColor: '#ffe3e3'
            }
          },
          children: [
            {
              type: 'DatePickerRangePicker',
              id: 'input-012',
              events: {
                onChange: `(date, dateString, ...arg) => {
                  const [handler] = arg.slice(-1);
                  const {updateState, updateEvents} = handler;
                  console.log(date, dateString);
                  console.log('handler >', handler);
                }`
              },
            },
          ]
        }
      ]
    },
    {
      type: 'Slider',
      id: 'slider-02',
      props: {
        placeholder: 'xxx',
        defaultValue: 30,
      },
      events: {
        onChange: `(percent, ...arg) => {
          const [handler] = arg.slice(-1);
          const {updateState, updateEvents} = handler;
          updateState({value: percent});
          console.log('handler >', handler);
        }`
      },
    },
    {
      type: 'RadioGroup',
      id: 'Radio-group-01',
      props: {
        value: 0
      },
      events: {
        onChange: `(e, ...arg) => {
          const [handler] = arg.slice(-1);
          const {updateState, updateEvents} = handler;
          updateState({value: e.target.value});
          updateState({checked: !!e.target.value}, 'switch-07');
          console.log('handler >', handler);
        }`
      },
      children: [
        {
          type: 'Radio',
          id: 'radio-04',
          props: {
            value: 0
          },
        },
        {
          type: 'Radio',
          id: 'radio-06',
          props: {
            value: 1
          },
        },
      ]
    },
    {
      type: 'Switch',
      id: 'switch-07',
      props: {
        defaultChecked: false
      },
      events: {
        onChange: `(checked, ...arg) => {
          const [handler] = arg.slice(-1);
          const {updateState, updateEvents} = handler;
          updateState({ checked });
          console.log('handler >', handler);
        }`
      },
    },
    {
      type: 'Tree',
      id: 'tree-08',
      props: {
        defaultExpandedKeys: ['0-0-0'],
        treeData: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0' },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0' },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              {
                title: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0' },
              { title: '0-1-0-1', key: '0-1-0-1' },
              { title: '0-1-0-2', key: '0-1-0-2' },
            ],
          },
          {
            title: '0-2',
            key: '0-2',
          },
        ]
      },
      events: {
        onSelect: `(selectedKeys, info, ...arg) => {
          const [handler] = arg.slice(-1);
          console.log('selected: >', selectedKeys, info);
          console.log('handler >', handler);
        }`,
      },
    },
    {
      type: 'Table',
      id: 'table-09',
      props: {
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: { customRender: 'name' },
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address 1',
            ellipsis: true,
          },
          {
            title: 'Long Column Long Column Long Column',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,
          },
          {
            title: 'Long Column Long Column',
            dataIndex: 'address',
            key: 'address 3',
            ellipsis: true,
          },
          {
            title: 'Long Column',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: true,
          },
        ],
        dataSource: [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park, London No. 2 Lake Park',
            tags: ['loser'],
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          },
        ]
      },
      events: {},
    }
  ]
}


export default defineComponent({
  setup() {
    return () => <div class={style.content}>
      <Core data={MOCK_DATA} id='xxx1' />
    </div>
  }
});
