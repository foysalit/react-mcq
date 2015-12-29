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

function _getDataState(examId) {
	return {
		answers: [],
		exam: (examId) ? ExamStore.getOne(examId) : {title: ''},
		editingQuestion: null
	};
}

export default class ExamCreate extends Component {
	constructor(props) {
		super(props);
		this.state = _getDataState();
		this.loadState = this.loadState.bind(this);
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

	loadState() {
		this.setState(_getDataState(this.props.params.examId));
	}

	componentDidMount() {
		QuestionStore.addChangeListener(this.loadState);
		ExamStore.addChangeListener(this.loadState);

		AppActions.changeTitle('Create Exam');
	}

	componentWillUnmount() {
		QuestionStore.removeChangeListener(this.loadState);
		ExamStore.removeChangeListener(this.loadState);
	}

	updateExamTitle(e) {
		let {exam} = this.state;
		if (!exam) return;

		exam.title = e.target.value;
		this.setState({exam: exam});
	}

	createExam() {
		ExamActions.create(this.state.exam).then((createdExam) => {
			ExamActions.loadQuestions(createdExam.id);
			this.setState({exam: createdExam});
			console.log(createdExam);
		});
	}

	render() {
		let styles = this.getStyles();
		let { exam } = this.state;

		return (
			<ExamForm
				exam={exam}
				onTitleChange={this.updateExamTitle.bind(this)}
				completeAction={this.createExam.bind(this)}
				type="create"/>
		);
	}
}
