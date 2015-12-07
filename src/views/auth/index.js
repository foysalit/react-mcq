import React, { Component } from 'react';
import AuthSignin from './signin';
import AuthSignup from './signup';
import { Paper } from 'material-ui'; 

export class Auth extends Component {
	constructor(props) {
		super(props);
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