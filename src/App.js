import React, { Component } from 'react';
import { AppBar, Icons, FontIcon } from 'material-ui'; 
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item'; 
import IconButton from 'material-ui/lib/icon-button'; 
import LeftNav from 'material-ui/lib/left-nav';
import AuthStore from './stores/auth';

const userMenuItems = [
	{ route: 'exams', text: 'Exams' },
	{ route: 'questions', text: 'Questions' },
];

const guestMenuItems = [
	{ route: 'auth/signin', text: 'SignIn' },
	{ route: 'auth/signup', text: 'SignUp' }
];

function _getMenuItems (user) {
	if (Object.keys(user).length > 0)
		return userMenuItems;

	return guestMenuItems;
}

function _getHomeState () {
	return {
		leftNavOpen: false,
		user: AuthStore.getUser(),
		menuItems: _getMenuItems(AuthStore.getUser())
	};
}

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = _getHomeState();
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._authChanged.bind(this));
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._authChanged.bind(this));
	}

	_authChanged() {
		this.setState(_getHomeState);
	}

	changePage() {
		this.setState({
			leftNavOpen: !this.state.leftNavOpen
		});
		this.refs.leftNav.toggle();
		console.log('change page clicked', this.state);
	}

	pageChanged(e, key, data) {
		this.props.history.pushState(null, data.route);
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<LeftNav 
					docked={false}
				  	ref="leftNav"
					open={this.state.leftNavOpen} 
					onChange={this.pageChanged.bind(this)}
					menuItems={this.state.menuItems} />
				<AppBar
				  title="Title"
				  onLeftIconButtonTouchTap={this.changePage.bind(this)}
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