let ofill = {
	ppid: 0,
	pid: 0,
	id: 0,
	serial_number: 0,
	poSition: "",
	qtitle: 0,
	option: [],
	sub_cat: "fill",
	is_must: false,
	title: '标题',
	show: true,
	edittextinput: true,
	changeButton: false
};

let osingle = {
	ppid: 0,
	pid: 0,
	id: 0,
	serial_number: 0,
	poSition: "",
	qtitle: 0,
	sub_cat: "single",
	is_must: false,
	title: '标题',
	show: true,
	edittextinput: true,
	changeButton: false,
	default_choose: '',
	option: [{
		id: 0,
		order_num: 1,
		option_name: '选项1',
		default_choose: 0,
		related_sub: "",
		skip_sub: ""
	}]
};

let omultiple = {
	id: 0,
	ppid: 0,
	pid: 0,
	qtitle: 0,
	sub_cat: "multiple",
	serial_number: 0,
	poSition: "",
	is_must: false,
	title: '标题',
	show: true,
	edittextinput: true,
	changeButton: false,
	option: [{
		id: 0,
		order_num: 1,
		option_name: '选项1',
		default_choose: 0,
		related_sub: "",
		skip_sub: ""
	}],
	checkedGroup: []
}

let omultistage = {
	id: 0,
	ppid: 0,
	pid: 0,
	poSition: '',
	qtitle: 0,
	sub_cat: "multistage",
	serial_number: 0,
	is_must: false,
	title: '标题',
	show: true,
	edittextinput: true,
	changeButton: false,
	doptions: [{
			value: '2',
			label: '2级',
			disabled: true
		},
		{
			value: '3',
			label: '3级',
			disabled: true
		},
		{
			value: '4',
			label: '4级',
			disabled: true
		}
	],
	value: "2",
	olist: [{
		"name": "",
		"value": "",
		"id": 1,
		"options": [],
		"childList": []
	}, {
		"name": "",
		"id": 2,
		"value": "",
		"options": [],
		"childList": []
	}, {
		"name": "",
		"value": "",
		"id": 3,
		"options": [],
		"childList": []
	}, {
		"name": "",
		"value": "",
		"id": 4,
		"options": [],
		"childList": []
	}]
};

let ouploadimg = {
	id: 0,
	ppid: 0,
	pid: 0,
	sub_cat: "uploadimg",
	serial_number: 0,
	poSition: "",
	qtitle: 0,
	is_must: false,
	title: '标题',
	show: true,
	edittextinput: true,
	changeButton: false,
	option: [{
		option_name: '1'
	}]
};

let oloCation = {
	id: 0,
	ppid: 0,
	pid: 0,
	sub_cat: "loCation",
	title: '标题',
	serial_number: 0,
	poSition: "",
	qtitle: 0,
	option: [],
	is_must: false,
	show: true,
	edittextinput: true,
	changeButton: false,
};

let ofractions = {
	id: 0,
	ppid: 0,
	pid: 0,
	poSition: '',
	qtitle: 0,
	sub_cat: "fractions",
	option: [{
		option_name: 100
	}],
	serial_number: 0,
	is_must: false,
	title: '标题',
	show: true,
	edittextinput: true,
	changeButton: false
};

export {
	ofill,
	osingle,
	omultiple,
	omultistage,
	ouploadimg,
	oloCation,
	ofractions
}