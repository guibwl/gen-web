// !请不要手动修改该文件及该目录下的内容，该目录内容皆通过 'npm run genComponents' 命令创建.
type ComponentsImporter = {
    [x: string]: Function
}

const componentsImporter: ComponentsImporter = {
    affix: () => import('@/components/Affix'),
	alert: () => import('@/components/Alert'),
	anchor: () => import('@/components/Anchor'),
	autoComplete: () => import('@/components/AutoComplete'),
	avatar: () => import('@/components/Avatar'),
	backTop: () => import('@/components/BackTop'),
	badge: () => import('@/components/Badge'),
	breadcrumb: () => import('@/components/Breadcrumb'),
	button: () => import('@/components/Button'),
	calendar: () => import('@/components/Calendar'),
	card: () => import('@/components/Card'),
	carousel: () => import('@/components/Carousel'),
	cascader: () => import('@/components/Cascader'),
	checkbox: () => import('@/components/Checkbox'),
	col: () => import('@/components/Col'),
	collapse: () => import('@/components/Collapse'),
	comment: () => import('@/components/Comment'),
	configProvider: () => import('@/components/ConfigProvider'),
	datePicker: () => import('@/components/DatePicker'),
	descriptions: () => import('@/components/Descriptions'),
	divider: () => import('@/components/Divider'),
	drawer: () => import('@/components/Drawer'),
	dropdown: () => import('@/components/Dropdown'),
	empty: () => import('@/components/Empty'),
	form: () => import('@/components/Form'),
	icon: () => import('@/components/Icon'),
	image: () => import('@/components/Image'),
	input: () => import('@/components/Input'),
	inputNumber: () => import('@/components/InputNumber'),
	layout: () => import('@/components/Layout'),
	list: () => import('@/components/List'),
	localeProvider: () => import('@/components/LocaleProvider'),
	mentions: () => import('@/components/Mentions'),
	menu: () => import('@/components/Menu'),
	modal: () => import('@/components/Modal'),
	pageHeader: () => import('@/components/PageHeader'),
	pagination: () => import('@/components/Pagination'),
	popconfirm: () => import('@/components/Popconfirm'),
	popover: () => import('@/components/Popover'),
	progress: () => import('@/components/Progress'),
	radio: () => import('@/components/Radio'),
	rate: () => import('@/components/Rate'),
	result: () => import('@/components/Result'),
	row: () => import('@/components/Row'),
	select: () => import('@/components/Select'),
	skeleton: () => import('@/components/Skeleton'),
	slider: () => import('@/components/Slider'),
	space: () => import('@/components/Space'),
	spin: () => import('@/components/Spin'),
	statistic: () => import('@/components/Statistic'),
	steps: () => import('@/components/Steps'),
	switch: () => import('@/components/Switch'),
	table: () => import('@/components/Table'),
	tabs: () => import('@/components/Tabs'),
	tag: () => import('@/components/Tag'),
	timePicker: () => import('@/components/TimePicker'),
	timeline: () => import('@/components/Timeline'),
	tooltip: () => import('@/components/Tooltip'),
	transfer: () => import('@/components/Transfer'),
	tree: () => import('@/components/Tree'),
	treeSelect: () => import('@/components/TreeSelect'),
	typography: () => import('@/components/Typography'),
	upload: () => import('@/components/Upload'),
}

export default componentsImporter;
