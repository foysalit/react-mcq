import React, { Component } from 'react';
import { AppBar, Icons, FontIcon } from 'material-ui';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import LeftNav from 'material-ui/lib/left-nav';
import AuthStore from './stores/auth';
import CommonStore from './stores/common';

function _getMenuItems () {
	const userMenuItems = [
		{ route: 'exams', text: 'Exams'},
		{ route: 'exams/create', text: 'Add Exam'},
		{ route: 'questions', text: 'Questions'},
	];

	const guestMenuItems = [
		{ route: 'auth/signin', text: 'SignIn'},
		{ route: 'auth/signup', text: 'SignUp'}
	];

	if (AuthStore.isLoggedIn())
		return userMenuItems;

	return guestMenuItems;
}

function _getHomeState () {
	return {
		appbar: CommonStore.getAppbarData(),
		user: AuthStore.getUser(),
		menuItems: _getMenuItems()
	};
}

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = _getHomeState();
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._authChanged.bind(this));
		CommonStore.addChangeListener(this._commonDataChanged.bind(this));
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._authChanged.bind(this));
		CommonStore.removeChangeListener(this._commonDataChanged.bind(this));
	}

	_authChanged() {
		this.setState(_getHomeState());
	}

	_commonDataChanged() {
		this.setState(_getHomeState());
	}

	changePage() {
		this.refs.leftNav.toggle();
	}

	pageChanged(e, key, data) {
		this.props.history.pushState(null, data.route);
	}

	render() {
		return (
			<div>
				<LeftNav
					docked={false}
				  	ref="leftNav"
					onChange={this.pageChanged.bind(this)}
					menuItems={this.state.menuItems} />
				<AppBar
				  title={this.state.appbar.title}
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
