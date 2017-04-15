/**
 * Created by Administrator on 2017/3/31.
 */
import React from 'react';
import NewsHeader from './NewsHeader.js';
import NewsItem from './NewItem.js';

export default class NewsList extends React.Component {
	render() {
		return (
			<div className="newsList">
				<NewsHeader />
				<NewsItem />
			</div>
		);
	}
}