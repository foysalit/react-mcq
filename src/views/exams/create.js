import React, { Component } from 'react';
import AuthActions from '../../actions/auth';
import AppActions from '../../actions/app';
import ExamActions from '../../actions/exam';
import ExamStore from '../../stores/exam';
import AuthStore from '../../stores/auth';

import ExamForm from './form';

import {
	ClearFix, Styles, Paper,
	List, ListItem,
	IconMenu, MenuItem,
	TextField,
	IconButton, RaisedButton, FloatingActionButton, FontIcon
} from 'material-ui';
import { Link } from 'react-router';

const { Colors } = Styles;

export default class ExamCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {exam: {
            title: ''
        }};
	}

	getStyles() {
		return {
			wrapper: {
				margin: '20px auto',
				width: '50%'
			},
			field: {
				width: '100%'
			},
			fieldWrapper: {
				marginBottom: '20px'
			},
			header: {
				padding: '5% 1.5%',
				backgroundColor: Colors.indigo500,
				color: Colors.white,
				position: 'relative'
			}
		};
	}

	componentDidMount() {
		AppActions.changeTitle('Create Exam');
	}

	updateExamTitle(e) {
		let {exam} = this.state;
		if (!exam) return;

		exam.title = e.target.value;
		this.setState({exam: exam});
	}

	createExam() {
		ExamActions.create(this.state.exam);
	}

	render() {
		let styles = this.getStyles();
		let { exam } = this.state;

		return (
			<div>
			<ExamForm
				exam={exam}
				onTitleChange={this.updateExamTitle.bind(this)}
				completeAction={this.createExam.bind(this)}
				type="create"/>
			</div>
		);
	}
}
