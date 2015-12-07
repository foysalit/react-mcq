import React, { Component } from 'react';
import ExamActions from '../../actions/exam';
import ExamStore from '../../stores/exam';
import ExamService from '../../services/exam';
import ExamSummary from './summary';
import { Card, CardHeader, CardText, CardActions, Avatar, FlatButton } from 'material-ui'; 
import AutoResponsive from 'autoresponsive-react';

function _getExamsState () {
	return  {
		exams: ExamStore.getAll()
	};
}

export class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = _getExamsState();
	}

	componentDidMount() {
		ExamService.getAll();
		ExamStore.addChangeListener(this._onChange.bind(this));

		window.addEventListener('resize', () => {
			this.setState({
				containerWidth: React.findDOMNode(this.refs.container).clientWidth
			});
		}, false);
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
		ExamStore.removeChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		this.setState(_getExamsState());
	}

	render() {
		let style = {
	        width: 300,
	        height: 250
	    };

		return (
			<AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
				{ this.state.exams.map((exam) => {
					return <ExamSummary exam={exam} key={exam.id} style={style}/>
				}) }
			</AutoResponsive>
		);
	}
}