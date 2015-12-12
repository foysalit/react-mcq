import QuestionDispatcher from '../dispatchers/question';
import QuestionConstants from '../constants/question';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';

let _questions = [];

function loadQuestions (questions) {
	_questions = questions;
}

function createQuestion (question) {
	_questions.push(question);
}

class QuestionStore extends EventEmitter {
	constructor() {
		super();
	}

	getAll() {
		return _questions;
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

const store = new QuestionStore();

QuestionDispatcher.register(function(payload){
	const action = payload.action;

	switch(action.actionType) {

		// Respond to RECEIVE_DATA action
		case QuestionConstants.QUESTION_LOAD:
			loadQuestions(action.data);
			break;
		case QuestionConstants.QUESTION_CREATE:
			createQuestion(action.data);
			break;

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;