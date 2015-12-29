import React, { Component } from 'react';
import ExamActions from '../../actions/exam';
import ExamStore from '../../stores/exam';
import ExamService from '../../services/exam';
import ExamSummary from './summary';
import AppActions from '../../actions/app';
import { Card, CardHeader, CardText, CardActions, Avatar, FlatButton } from 'material-ui';
import AutoResponsive from 'autoresponsive-react';

function _getExamsState () {
	return  {
		exams: ExamStore.getAll()
	};
}

export default class ExamList extends Component {
	constructor(props) {
		super(props);
		this.state = _getExamsState();
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		ExamService.getAll();
		ExamStore.addChangeListener(this._onChange);

		window.addEventListener('resize', () => {
			this.setState({
				containerWidth: React.findDOMNode(this.refs.container).clientWidth
			});
		}, false);

		AppActions.changeTitle('Exams');
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
		ExamStore.removeChangeListener(this._onChange);
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
			<div style={{ padding: '0 1%' }}>
				<AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
					{ this.state.exams.map((exam) => {
						return <ExamSummary exam={exam} key={exam.id} style={style}/>
					}) }
				</AutoResponsive>
			</div>
		);
	}
}
