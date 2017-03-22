import React,{ Component } from 'react';

class ImgList extends Component{
	constructor(props){
		super(props);
	}
	render() {
		const {
			itemArr,
			itemObj,
			onLoad,
			width
		} = this.props;
		return(
			<div style={{height:_global.innerHeight,width:_global.innerWidth,position:'relative'}}>
				{
					itemArr.map((item,index)=>{
						return (
							<img 
								src={itemObj[item].img} 
								key={index} 
								width={width} 
								style={{position:'absolute',left:itemObj[item].left,top:itemObj[item].top}}
								id={item}
								onLoad={onLoad} 
							/>
						);
					})
				}
			</div>
		);
	}

}

export default ImgList;
