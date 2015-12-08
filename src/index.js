import React from 'react';
import { render } from 'react-dom';
import { Exam } from './views/exams/index.js';
import { Auth, AuthSignin, AuthSignup } from './views/auth';
import { Question } from './views/questions/index.js';
import { App } from './App';
import AuthStore from './stores/auth';
import { Router, Route } from 'react-router';
import { createHistory, useBasename } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './css/styles.css';

injectTapEventPlugin();

const history = useBasename(createHistory)({
	basename: '/'
})

function requireAuth(nextState, replaceState) {
	if (!AuthStore.isLoggedIn())
		replaceState({ nextPathname: nextState.location.pathname }, '/auth/signin')
}

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="exams" component={Exam} onEnter={requireAuth} />
			<Route path="questions" component={Question} onEnter={requireAuth} />
			<Route path="auth" component={Auth}>
				<Route path="/auth/signin" component={AuthSignin} />
				<Route path="/auth/signup" component={AuthSignup} />
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
