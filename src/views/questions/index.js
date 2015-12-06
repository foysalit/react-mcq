import React, { Component } from 'react';
import { AppBar, Icons, FontIcon } from 'material-ui'; 
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item'; 
import IconButton from 'material-ui/lib/icon-button'; 
import LeftNav from 'material-ui/lib/left-nav';

export class Question extends Component {
	componentDidMount() {
		console.log('now rendering questions page');
	}

	render() {
		return (
			<div>
				questions page test
			</div>
		);
	}
}