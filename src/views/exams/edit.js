import React, { Component } from 'react';
import AuthActions from '../../actions/auth';
import AppActions from '../../actions/app';
import QuestionStore from '../../stores/question';
import QuestionActions from '../../actions/question';
import ExamActions from '../../actions/exam';
import ExamStore from '../../stores/exam';
import AuthStore from '../../stores/auth';

import QuestionSingle from '../questions/single';

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
		QuestionStore.addChangeListener(this.loadState.bind(this));
		ExamStore.addChangeListener(this.loadState.bind(this));

		AppActions.changeTitle('Edit Exam');
		ExamActions.loadQuestions(this.props.params.examId);
	}

	componentWillUnmount() {
		QuestionStore.removeChangeListener(this.loadState.bind(this));
		ExamStore.removeChangeListener(this.loadState.bind(this));
	}

	selectForEdit(question) {
		QuestionActions.loadChoices(question.id).then(() => {
			this.setState({editingQuestion: QuestionStore.getOne(question.id)});
			console.log(this.state);			
		});
	}

	render() {
		let styles = this.getStyles();
		let { exam, editingQuestion } = this.state;

		return (
			<div>
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

				<div style={{padding: '2% 3%'}}>
					<div style={ styles.fieldWrapper }>
						<TextField 
							ref='email'
							style={ styles.field }
							type='email'
							hintText="Email Address" />
					</div>
				</div>
			</Paper>
			: null }

			<Paper style={styles.wrapper}>
				{ (exam && exam.questions && exam.questions.length > 0) ? 
					<List subheader="Questions">
						{exam.questions.map((question) => {
							return (<ListItem
								onTouchTap={this.selectForEdit.bind(this, question)}
								rightIconButton={
									<IconButton 
										iconClassName="material-icons" 
										onTouchTap={this.selectForEdit.bind(this, question)}
										touch={true}>
										edit
									</IconButton>}
				                primaryText={question.title} />
				            )
						})}
					</List>
				: null}
			</Paper>
			</div>
		);
	}
}