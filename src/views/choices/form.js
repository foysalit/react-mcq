import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
	TextField,
	RaisedButton, FloatingActionButton, FontIcon
} from 'material-ui';

export default class ChoiceForm extends Component {
	propTypes: {
		coice: PropTypes.object
	}

	constructor(props) {
		super(props);
	}

	getStyles() {
		return {
			field: {
				width: '100%'
			}
		};
	}

	render() {
		let styles = this.getStyles();
		let { choice, onChange, updateChoice } = this.props;

		return (
            <div>
                <TextField
                    ref={`choices[${choice.id}]`}
                    style={ styles.field }
                    type='text'
                    value={choice.title}
                    onChange={onChange}
                    onBlur={updateChoice}
                    hintText="Insert A Choice" />
            </div>
		);
	}
}
