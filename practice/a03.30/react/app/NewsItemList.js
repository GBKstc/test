/**
 * Created by Administrator on 2017/3/31.
 */
import React from 'react';
import '../css/NewsItem.css';
import URL from 'url';
import ImageGrayArrow from '../img/grayarrow.gif';
import Moment from 'moment';

// const testData = {
// 	"by" : "bane",
// 	"descendants" : 49,
// 	"id" : 11600137,
// 	"kids" : [ 11600476, 11600473, 11600501, 11600463, 11600452, 11600528, 11600421, 11600577, 11600483 ],
// 	"score" : 56,
// 	"time" : 1461985332,
// 	"title" : "Yahoo's Marissa Mayer could get $55M in severance pay",
// 	"type" : "story",
// 	"url" : "http://www.latimes.com/business/technology/la-fi-0429-tn-marissa-mayer-severance-20160429-story.html"
// };
export default class NewsItemList extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state={};
	}
	componentWillMount(){
		this.setState({
			testData:this.props.data,
			num:this.props.index,
		})
	}
	getDomain(){
		return URL.parse(this.state.testData.url).hostname;
	}
	getTitle(){
		return (
			<div className="newsItem-title">
				<a className="newsItem-titleLink" href={this.state.testData.url}>{this.state.testData.title}</a>
				{
					this.state.testData.url&&<span className="newsItem-domain"><a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>({this.getDomain()})</a></span>
				}
			</div>
		);
	}
	getCommentLink(){ // 评论链接
		let commentText = 'discuss';
		if (this.state.testData.kids&&this.state.testData.kids.length){
			commentText = this.state.testData.kids.length + ' comment';
		}
		return (
			<a href={'https://news.ycombinator.com/item?id=' + this.state.testData.id}>{commentText}</a>
		);
	}
	getSubtext() { // 分数, 作者, 时间, 评论数
		return (
			<div className="newsItem-subtext">
				{this.state.testData.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.state.testData.by}>{this.state.testData.by}</a> {Moment.utc(this.state.testData.time * 1000).fromNow()} | {this.getCommentLink()}
			</div>
		);
	}

	getRank() { // 序号
		return (
			<div className="newsItem-rank">
				{this.state.num}
			</div>
		);
	}

	getVote() { // 投票
		return (
			<div className="newsItem-vote">
				<a href={'https://news.ycombinator.com/vote?for='+ this.state.testData.id + '&dir=up&goto=news'}>
					<img src={ImageGrayArrow} width="10" />
				</a>
			</div>
		);
	}
	render() {
		return (
			<div className="newsItem">
				{this.getRank()}
				{this.getVote()}
				<div className="newsItem-itemText">
					{this.getTitle()}
					{this.getSubtext()}
				</div>
			</div>
		);
	}
}