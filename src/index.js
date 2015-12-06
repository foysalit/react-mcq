import React from 'react';
import { render } from 'react-dom';
import { Exam } from './views/exams/index.js';
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
		</Route>
	</Router>
), document.getElementById('root'));
