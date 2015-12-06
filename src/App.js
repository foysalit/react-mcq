import React, { Component } from 'react';
import { AppBar, Icons, FontIcon } from 'material-ui'; 
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item'; 
import IconButton from 'material-ui/lib/icon-button'; 
import LeftNav from 'material-ui/lib/left-nav';

const menuItems = [
	{ route: '/exams', text: 'Exams' },
	{ route: '/questions', text: 'Questions' },
];

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftNavOpen: false
		};
	}

	changePage() {
		this.setState({
			leftNavOpen: !this.state.leftNavOpen
		});
	}

	pageChanged() {
		console.log('page');
	}

	render() {
		return (
			<div>
				<LeftNav 
					openRight={true}
					docked={false}
					open={this.state.leftNavOpen} 
					ref="leftNav" 
					onChange={this.pageChanged.bind(this)}
					menuItems={menuItems} />
				<AppBar
				  title="Title"
				  iconElementLeft={<IconButton><Icons.NavigationMenu /></IconButton>}
				  onTitleTouchTap={this.changePage.bind(this)}
				  onLeftIconButtonTouchTap={this.changePage.bind(this)}
				  onRightIconButtonTouchTap={this.changePage.bind(this)}
				  iconElementRight={
				    <IconMenu iconButtonElement={
				      <IconButton iconClassName="material-icons">more_vert</IconButton>
				    }>
				      <MenuItem primaryText="Refresh"/>
				      <MenuItem primaryText="Help"/>
				      <MenuItem primaryText="Sign out"/>
				    </IconMenu>
				} />

				<div style={{marginTop: '15px'}}>
					{this.props.children}
				</div>	
			</div>
		);
	}
}

class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0 };
		this.interval = setInterval(() => this.tick(), 1000);
	}

	tick() {
		this.setState({
			counter: this.state.counter + this.props.increment
		});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<h1 style={{ color: this.props.color }}>
				Counter ({this.props.increment}): {this.state.counter}
			</h1>
		);
	}
}