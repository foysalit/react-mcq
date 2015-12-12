import React, { Component } from 'react';
import QuestionActions from '../../actions/question';
import QuestionStore from '../../stores/question';
import QuestionService from '../../services/question';
import AppActions from '../../actions/app';
import { Card, CardHeader, CardText, CardActions, Avatar, FlatButton } from 'material-ui'; 
import AutoResponsive from 'autoresponsive-react';

function _getQuestionsState (questionId) {
	return  {
		answers: AnswerStore.getForQuestion()
	};
}

export default class QuestionSingle extends Component {
	constructor(props) {
		super(props);
		this.state = _getQuestionsState(props.question.id);
	}

	componentDidMount() {
		QuestionStore.addChangeListener(this._onChange.bind(this));
		QuestionService.getAll();

		window.addEventListener('resize', () => {
			this.setState({
				containerWidth: React.findDOMNode(this.refs.container).clientWidth
			});
		}, false);
		
		AppActions.changeTitle('Questions');
	}

	getAutoResponsiveProps() {
		return {
			itemMargin: 2,
			containerWidth: this.state.containerWidth || document.body.clientWidth,
			itemClassName: 'item',
			gridWidth: 100,
			transitionDuration: '.5'
		};
	}

	componentWillUnmount() {
		QuestionStore.removeChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		this.setState(_getQuestionsState());
	}

	render() {
		let style = {
	        width: 300,
	        height: 250
	    };

		return (
			<div style={{ padding: '0 1%' }}>
				<AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
					{ this.state.questions.map((question) => {
						return <QuestionSummary question={question} key={question.id} style={style}/>
					}) }
				</AutoResponsive>
			</div>
		);
	}
}