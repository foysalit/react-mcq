import React, { Component } from 'react';
import AuthSignin from './signin';
import AuthSignup from './signup';
import AuthStore from '../../stores/auth';
import AppActions from '../../actions/app';
import { Paper } from 'material-ui'; 

export class Auth extends Component {
	constructor(props) {
		super(props);
	}

	_authChanged () {
		const { location, history } = this.props

		console.log(AuthStore.isLoggedIn());
		if (!AuthStore.isLoggedIn())
			return;

		if (location.state && location.state.nextPathname) {
			history.replaceState(null, location.state.nextPathname);
		} else {
			history.replaceState(null, '/exams');
		}
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._authChanged.bind(this));
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this._authChanged.bind(this));
	}

	render() {
		const style = {
			width: '30%',
			margin: '0 auto'
		};

		return (
			<Paper style={style}>
				{ this.props.children }
			</Paper>
		);
	}
}

export {Auth, AuthSignin, AuthSignup};