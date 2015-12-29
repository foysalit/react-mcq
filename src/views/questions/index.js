import React, { Component, PropTypes } from 'react';

import QuestionSingle from './single';

import {
	ClearFix, Paper,
	List, ListItem,
	TextField,
	IconButton, RaisedButton, FloatingActionButton, FontIcon
} from 'material-ui';

export default class QuestionList extends Component {
	getStyles() {
		return {
			wrapper: {
				margin: '20px auto',
				width: '50%'
			}
		};
	}

	componentDidMount() {
		console.log('now rendering questions page');
	}

	selectForEdit(question) {
		QuestionActions.load(question);
		QuestionActions.loadChoices(question.id).then(() => {
			this.setState({editingQuestion: QuestionStore.getOne(question.id)});
		});
	}

	render() {
		let styles = this.getStyles();
		let { questions } = this.props;

		return (
			<div>
			<Paper style={styles.wrapper}>
				<RaisedButton
					primary={true}
					style={{float: 'right', margin: '10px 10px 0 0'}}
					label="Add Question" />

				<List subheader="Questions">
					{ (questions && questions.length > 0) ? questions.map((question) => {
						return (<ListItem
							key={question.id}
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
					}) : null}
				</List>
			</Paper>
			</div>
		);
	}
}
