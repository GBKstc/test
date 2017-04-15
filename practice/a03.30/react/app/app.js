/**
 * Created by Administrator on 2017/3/30.
 */
import $ from "jquery";
import React from "react";
import {render} from 'react-dom';
import NewsList from './NewsList.js';
import '../css/app.css'

class HelloWorld extends React.Component{
	render(){
		return(
			<NewsList />
		)
	}
}

render(<HelloWorld/>,document.getElementById("xigua"));