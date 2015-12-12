import AnswerDispatcher from '../dispatchers/answer';
import AnswerConstants from '../constants/answer';
import { EventEmitter } from 'events';
import { findWhere } from 'lodash';

var CHANGE_EVENT = 'change';

let _answers = [];

function loadAnswers (answers) {
	_answers = answers;
}

class AnswerStore extends EventEmitter {
	constructor() {
		super();
	}

	getForQuestion(id) {
		return findWhere(_answers, {id: id});
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on('change', callback);
	}

	removeChangeListener(callback) {
		this.removeListener('change', callback);
	}
}

const store = new AnswerStore();

AnswerDispatcher.register(function(payload){
	const action = payload.action;

	switch(action.actionType) {

		// Respond to RECEIVE_DATA action
		case AnswerConstants.ANSWER_LOAD:
			loadAnswers(action.data);
			break;

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;