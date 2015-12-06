import React, { Component } from 'react';
import ExamActions from '../../actions/exam';
import ExamStore from '../../stores/exam';
import ExamService from '../../services/exam';
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
		var ui = this;
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

	showExam(exam) {
		let style = {
	        width: 300,
	        height: 300
	    };

		return (
			<Card initiallyExpanded={true} key={exam.id} style={style}>
				<CardHeader
					title={ exam.title }
					subtitle={ exam.created_at }
					avatar={<Avatar style={{color:'red'}}>A</Avatar>}
					actAsExpander={true}
					showExpandableButton={true}>
				</CardHeader>

				<CardText expandable={true}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
					Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
					Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
				</CardText>
				
				<CardActions expandable={true}>
					<FlatButton label="See Questions" linkButton={true} href="/#/questions" />
					<FlatButton label="Action2"/>
				</CardActions>
			</Card>
		)
	}

	render() {
		return (
			<AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
				{ this.state.exams.map(this.showExam.bind(this)) }
			</AutoResponsive>
		);
	}
}