import React, { Component, PropTypes } from 'react';
import net from 'net';
import ImgList from './ImgList';
class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			itemArr: [],
			itemObj: {},
			column:5
		};
		let {column}=this.state;
		// 生成一个长度为column的数组，5个值都赋值为0
		// let heightArr = new Array(column);
		// this.heightArr = heightArr.fill(0);
		this.heightArr = Array.from({length:column},()=>0);//同上

		this.width = window.innerWidth/column;//计算每一列的宽度

		this.handleOnload = this.handleOnload.bind(this);
	}
	componentWillMount(){
		this.loadData();
	}
	componentWillUnmount() {
	}
	loadData() {//ajax请求
		net.ajax({
			url: 'http://localhost:3000/test',
			type: 'GET',
			success: (res) => {

				let items = this.initItem(res.data.item_list);
				console.log(items);
				this.setState({
					itemArr: items.itemArr,
					itemObj: items.itemObj,
				});
			},
			error: (res) => {}
		});
	}
	initItem(res,str) {
	/*
	 * 将对象数组拆分成数组和对象的形式的一个对象
	 * [{id:"1",img:"imgurl"},{id:"2",img:"url2"},...]
	 * => { itemArr:["1","2",...],itemObj:{"1":{id:"1",img:"url"},"2":...} }
	*/
		let itemArr = [];
		let itemObj = {};
		let data;
		let id = 'id';

		if (typeof res == "object" && res.data && res.data instanceof Array) { //传入的不是数组。res.data是数组
			data = res.data;
		} else if (res instanceof Array) { //传入的是数组
			data = res;
		} else {
			return console.error('初始化参数错误');
		}
		for (let i = 0; i < data.length; i++) {
			itemArr = [...itemArr, data[i][id]];
			itemObj = {
				...itemObj,
				[data[i][id]]: data[i]
			};
		}

		return {itemArr,itemObj};
	}

	handleOnload(event){//图片加载后执行
		let {
			itemObj
		} = this.state;

		let width = this.width;
		console.log(this.heightArr);
		let item = event.target.id;

		//获取heightArr中的最小值的index
		let min = Math.min(...this.heightArr);
		let index = this.heightArr.indexOf(min);

		//将位置的值赋值给对象中对应的元素
		itemObj ={
			...itemObj,
			[item]:{
				...itemObj[item],
				left: index * width +'px',
				top: this.heightArr[index]+'px'
			}
		};

		this.heightArr[index] += event.target.height;//对应index的列长度增加

		this.setState({
			itemObj: itemObj,
		});
	}
	render() {
		const {
			itemArr,
			itemObj,
			column
		} = this.state;
		return(
			<div style={{height:_global.innerHeight,width:_global.innerWidth,position:'relative'}}>
				<ImgList 
					itemObj={itemObj}
					itemArr={itemArr}
					onLoad={this.handleOnload}
					width={this.width}
				/>
			</div>
		);
	}
}
export default App;

