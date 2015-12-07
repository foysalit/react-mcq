import React, { Component } from 'react';
import { 
	Card, CardHeader, CardText, CardActions, 
	Avatar, 
	RaisedButton, FloatingActionButton, FontIcon 
} from 'material-ui'; 

export default class ExamSummary extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { exam, style } = this.props;

		return (
			<Card initiallyExpanded={true} style={style}>
				<CardHeader
					title={ exam.title }
					subtitle={ exam.created_at }
					avatar={<Avatar style={{color:'red'}}>A</Avatar>}>
				</CardHeader>

				<CardText expandable={true}>
					<p> Has been taken: 10 times</p>
					<p> Expired: No</p>
				</CardText>
				
				<CardActions expandable={true}>
					<RaisedButton 
						primary={true} 
						label="See Questions" 
						linkButton={true} 
						href="/#/questions" />
					<FloatingActionButton 
						secondary={true} 
						label="Edit" 
						labelPosition="after"
						linkButton={true} 
						mini={true}
						style={{float: 'right'}}
						href={`/#/exams/${exam.id}/edit`}>
						<FontIcon className="material-icons">mode_edit</FontIcon>
					</FloatingActionButton>
				</CardActions>
			</Card>
		);
	}
}