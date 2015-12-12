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
	TextField,
	RaisedButton, FloatingActionButton, FontIcon 
} from 'material-ui'; 
import { Link } from 'react-router';

const { Colors } = Styles;

function _getDataState(examId) {
	return {
		answers: [],
		exam: ExamStore.getOne(examId),
		addingAnswer: false
	};
}

export default class ExamEdit extends Component {
	constructor(props) {
		super(props);
		this.state = _getDataState();
		console.log(this.state);
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
				backgroundColor: Colors.indigo700,
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
		QuestionStore.addChangeListener(this.loadState.bind(this));

		AppActions.changeTitle('Edit Exam');
		ExamActions.loadQuestions(this.props.params.examId);
	}

	componentWillUnmount() {
		QuestionStore.removeChangeListener(this.loadState.bind(this));
	}

	render() {
		let styles = this.getStyles();

		return (
			<div>
			<Paper style={styles.wrapper}>
				<div style={ styles.header }>
					<div style={ styles.fieldWrapper }>
						<TextField 
							ref='title'
							style={ styles.field }
							type='text'
							hintText="What is the question?" />
					</div>

					<FloatingActionButton 
						style={{position: 'absolute', right: '10px', bottom: '-20px'}}
						secondary={true} 
						label="Signup" 
						labelPosition="after"
						onTouchTap={this.addQuestion}
						mini={true}
						>
						<FontIcon className="material-icons">add</FontIcon>
					</FloatingActionButton>
				</div>

				<div style={{padding: '2% 3%'}}>

					<div style={ styles.fieldWrapper }>
						<TextField 
							ref='email'
							style={ styles.field }
							type='email'
							hintText="Email Address" />
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
						primary={true} 
						label="Sign Up" />
				</div>
			</Paper>

			{ (this.state.exam && this.state.exam.questions.length > 0) ? 
				<List subheader="Questions">
					{this.state.exam.questions.map((question) => {
						<ListItem
			                primaryText={question.title} />
					})}
				</List>
			: null}
			</div>
		);
	}
}