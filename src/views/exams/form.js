import React, { Component } from 'react';
import { Link } from 'react-router';
import {
	Paper, TextField,
	RaisedButton, FloatingActionButton, FontIcon
} from 'material-ui';

export default class ExamForm extends Component {
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
				width: '100%'
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
            <Paper style={styles.wrapper}>
                <div style={styles.fieldWrapper}>
                    <TextField
                        style={ styles.field }
                        type='text'
                        value={exam.title}
                        onChange={onTitleChange}
                        onBlur={completeAction}
                        floatingLabelText={options.titleLabel} />
                </div>
            </Paper>
		);
	}
}
