import React from 'react';
import { render } from 'react-dom';
import { Exam } from './views/exams/index.js';
import { Auth, AuthSignin, AuthSignup } from './views/auth';
import { Question } from './views/questions/index.js';
import { App } from './App';
import { Router, Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './css/styles.css';

injectTapEventPlugin();

render((
	<Router>
		<Route path="/" component={App}>
			<Route path="exams" component={Exam} />
			<Route path="questions" component={Question} />
			<Route path="auth" component={Auth}>
				<Route path="/auth/signin" component={AuthSignin} />
				<Route path="/auth/signup" component={AuthSignup} />
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
