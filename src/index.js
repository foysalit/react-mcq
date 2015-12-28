import React from 'react';
import { render } from 'react-dom';
import { ExamList, ExamEdit, ExamCreate } from './views/exams/';
import { Auth, AuthSignin, AuthSignup } from './views/auth';
import { Question } from './views/questions/index.js';
import { App } from './App';
import AuthStore from './stores/auth';
import AuthActions from './actions/auth';
import { Router, Route } from 'react-router';
import { createHistory, useBasename } from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './css/styles.css';

injectTapEventPlugin();

const history = useBasename(createHistory)({
	basename: '/'
})

function requireAuth(nextState, replaceState, done) {
	AuthActions.checkUser().then(() => {
		if (!AuthStore.isLoggedIn())
			replaceState({ nextPathname: nextState.location.pathname }, '/auth/signin');

		done();
	}).catch(() => {
		return replaceState({ nextPathname: nextState.location.pathname }, '/auth/signin');
	});

}

function checkAuth(nextState, replaceState, done) {
	AuthActions.checkUser().then((data) => {
		if (AuthStore.isLoggedIn())
			replaceState({  }, '/exams');

		done();
	});
}

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="exams" component={ExamList} onEnter={requireAuth} />
			<Route path="/exams/create" component={ExamCreate} onEnter={requireAuth} />
			<Route path="/exams/:examId/edit" component={ExamEdit} onEnter={requireAuth} />
			<Route path="questions" component={Question} onEnter={requireAuth} />
			<Route path="auth" component={Auth} onEnter={checkAuth}>
				<Route path="/auth/signin" component={AuthSignin} />
				<Route path="/auth/signup" component={AuthSignup} />
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
