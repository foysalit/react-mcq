import React, { Component } from 'react';
import AuthActions from '../../actions/auth';
import AppActions from '../../actions/app';
import AuthStore from '../../stores/auth';
import {
	ClearFix, Styles,
	TextField,
	RaisedButton, FloatingActionButton, FontIcon
} from 'material-ui';
import { Link } from 'react-router';

const { Colors } = Styles;

function _getDataState() {
	return {
		errors: AuthStore.getErrors()
	};
}

export default class AuthSignin extends Component {
	constructor(props) {
		super(props);
		this.state = _getDataState();
	}

	getStyles() {
		return {
			wrapper: {
				marginBottom: '20px'
			},
			field: {
				width: '100%'
			}
		};
	}

	signin() {
		const {email, password} = this.refs;
		const credentials = {
			email: email.getValue(),
			password: password.getValue()
		};

		AuthActions.signin(credentials);
	}

	getDataState() {
		this.setState(_getDataState());
	}

	componentDidMount() {
		AuthStore.addChangeListener(this.getDataState.bind(this));

		AppActions.changeTitle('Sign In');
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this.getDataState.bind(this));
	}

	render() {
		let styles = this.getStyles();

		return (
			<ClearFix style={{ padding: '2%' }}>

				{(this.state.errors && this.state.errors.length > 0) ?
					<div style={{ color: Colors.redA400 }}>
						{ this.state.errors.map((message, i) => {
							return <p key={i}> { message } </p>
						})}
					</div>
				: null }
				<form onSubmit={this.signin.bind(this)}>
					<div style={ styles.wrapper }>
						<TextField
							ref='email'
							style={ styles.field }
							type='email'
							hintText="Email Address" />
					</div>

					<div style={ styles.wrapper }>
						<TextField
							ref="password"
							style={ styles.field }
							hintText="Password"
							type="password"/>
					</div>

					<FloatingActionButton
						secondary={true}
						label="Signup"
						labelPosition="after"
						linkButton={true}
						mini={true}
						containerElement={<Link to="/auth/signup" />}>
						<FontIcon className="material-icons">lock_open</FontIcon>
					</FloatingActionButton>

					<RaisedButton
						style={{float: 'right'}}
						onTouchTap={this.signin.bind(this)}
						primary={true}
						label="Login" />
				</form>

			</ClearFix>
		);
	}
}
