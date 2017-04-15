/**
 * Created by Administrator on 2017/4/1.
 */
import React from "react";
import NewsItemList from './NewsItemList';
import $ from 'jquery';
export default class NewItem extends React.Component {
	constructor(props, context){
		super(props, context);
		this.getData = this.getData.bind(this);
		this.state={
			allData:[],
		};
	}

	componentWillMount(){
		this.getData();
	}

	get(url){
		return Promise.resolve($.ajax(url));
	}

	getData(index=0){
		let num = index*30;
		this.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(
			stories=>Promise.all(stories.slice(0,30).map(itemId=>this.get('https://hacker-news.firebaseio.com/v0/item/'+itemId+'.json')))
		).then(item=>{this.setState({
			allData:item
		})});
	}
	render(){
		let data = this.state.allData;
		return (
			<div>
				{
					data.map(function (obj,index,data) {
						return (
							<NewsItemList
								data={obj}
								key={index}
								index={index}
							/>
						)
					})
				}
			</div>
		)
	}
}