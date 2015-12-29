import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
	Paper, TextField,
	RaisedButton, FloatingActionButton, FontIcon
} from 'material-ui';

import QuestionList from '../questions/index';

export default class ExamForm extends Component {
	static propTypes = {
		exam: PropTypes.object,
		type: PropTypes.string,
		completeAction: PropTypes.func
	}

	constructor(props) {
		super(props);
	}

	getStyles() {
		return {
			wrapper: {
				margin: '20px auto',
				width: '50%'
			},
			fieldWrapper: {
				marginBottom: '20px',
                padding: '2% 1.5%'
			},
			field: {
				width: '90%'
			}
		};
	}

    getOptions(type = 'create') {
        let options = {
            titleLabel: 'Title',
        };

        if (type == 'create') {
        } else if (type == 'edit') {
        }

        return options;
    }

	render() {
		let styles = this.getStyles();
		let { exam, onTitleChange, completeAction, type } = this.props;
        const options = this.getOptions(type);

		return (
			<div>
            <Paper style={styles.wrapper}>
                <div style={styles.fieldWrapper}>
                    <TextField
                        style={ styles.field }
                        type='text'
                        value={exam.title}
                        onChange={onTitleChange}
                        floatingLabelText={options.titleLabel} />

					<FloatingActionButton
						label="Save"
						labelPosition="after"
						linkButton={true}
						mini={true}
						onTouchTap={completeAction}
						style={{float: 'right', marginTop: '20px'}}>
						<FontIcon className="material-icons">done_all</FontIcon>
					</FloatingActionButton>
                </div>
            </Paper>

			{ (exam && exam.id) ?
				<QuestionList questions={exam.questions}/>
			: null }
			</div>
		);
	}
}
