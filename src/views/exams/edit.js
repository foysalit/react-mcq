import React, { Component } from 'react';
import AuthActions from '../../actions/auth';
import AppActions from '../../actions/app';
import QuestionStore from '../../stores/question';
import QuestionActions from '../../actions/question';
import ExamActions from '../../actions/exam';
import ExamStore from '../../stores/exam';
import AuthStore from '../../stores/auth';

import ChoiceForm from '../choices/form';
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
		exam: ExamStore.getOne(examId),
		editingQuestion: null
	};
}

export default class ExamEdit extends Component {
	constructor(props) {
		super(props);
		this.state = _getDataState();
		this.loadState = this.loadState.bind(this);
	}

	addAnswer() {
		const { title } = this.refs;

		QuestionActions.create({title});
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

		AppActions.changeTitle('Edit Exam');
		ExamActions.loadOne(this.props.params.examId).then(() => {
			ExamActions.loadQuestions(this.props.params.examId);
		});
	}

	componentWillUnmount() {
		QuestionStore.removeChangeListener(this.loadState);
		ExamStore.removeChangeListener(this.loadState);
	}

	choiceUpdated(e, data) {

	}

	updateExamTitle(e) {
		let {exam} = this.state;
		if (!exam) return;

		exam.title = e.target.value;
		this.setState({exam: exam});
	}

	updateExam() {
		ExamActions.save(this.state.exam);
	}

	render() {
		let styles = this.getStyles();
		let { exam, editingQuestion } = this.state;

		return (
			<div>
			<ExamForm
				exam={exam}
				onTitleChange={this.updateExamTitle.bind(this)}
				completeAction={this.updateExam.bind(this)}
				type="edit"/>

			{(editingQuestion) ?
			<Paper style={styles.wrapper}>
				<div style={ styles.header }>
					<div style={ styles.fieldWrapper }>
						<TextField
							ref='title'
							inputStyle={{ color: Colors.white }}
							style={ styles.field }
							type='text'
							value={editingQuestion.title}
							hintText="What is the question?" />
					</div>

					<div style={{float: 'right', marginTop: '25px'}}>
						<FloatingActionButton
							style={{marginRight: '10px'}}
							secondary={true}
							label="Add Question"
							labelPosition="after"
							onTouchTap={this.addQuestion}
							mini={true}>
							<FontIcon className="material-icons">add</FontIcon>
						</FloatingActionButton>
						<FloatingActionButton
							style={{marginRight: '10px'}}
							label="Save"
							labelPosition="after"
							onTouchTap={this.saveQuestion}
							mini={true}>
							<FontIcon className="material-icons">done</FontIcon>
						</FloatingActionButton>
					</div>
				</div>

				{ (editingQuestion.choices && editingQuestion.choices.length > 0) ?
					<div style={{padding: '2% 3%'}}>
					<h3>Choices</h3>
					{ editingQuestion.choices.map((choice) => {
						return <ChoiceForm
							choice={choice}
							updateChoice={this.choiceUpdated.bind(this)}
							onChange={this.choiceUpdated.bind(this)}/>;
					})}
					</div>
				: null }
			</Paper>
			: null }
			</div>
		);
	}
}
