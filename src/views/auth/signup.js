import React, { Component } from 'react';
import AuthActions from '../../actions/auth';
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

export default class AuthSignup extends Component {
	constructor(props) {
		super(props);
		this.state = _getDataState();
	}

	signup() {
		const {email, password, password_confirmation} = this.refs;
		const credentials = {
			email: email.getValue(),
			password: password.getValue(),
			password_confirmation: password_confirmation.getValue(),
		};

		AuthActions.signup(credentials);
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

	componentDidMount() {
		AuthStore.addChangeListener(() => {
			this.setState(_getDataState());
		});
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(() => {
			this.setState(_getDataState());
		});
	}

	render() {
		let styles = this.getStyles();

		return (
			<ClearFix style={{ padding: '2%' }}>

				<div style={{ color: Colors.redA400 }}>{ this.state.errors.map((message, i) => {
					return <p key={i}> { message } </p>
				})}</div>

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

				<div style={ styles.wrapper }>
					<TextField 
						ref="password_confirmation"
						style={ styles.field }
						hintText="Confirm Password" 
						type="password"/>
				</div>

				<FloatingActionButton 
					secondary={true} 
					label="Signup" 
					labelPosition="after"
					linkButton={true} 
					mini={true}
					containerElement={<Link to="/auth/signin" />}>
					<FontIcon className="material-icons">account_circle</FontIcon>
				</FloatingActionButton>

				<RaisedButton 
					style={{float: 'right'}}
					onTouchTap={this.signup.bind(this)}
					primary={true} 
					label="Sign Up" />

			</ClearFix>
		);
	}
}