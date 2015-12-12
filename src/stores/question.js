import QuestionDispatcher from '../dispatchers/question';
import QuestionConstants from '../constants/question';
import { EventEmitter } from 'events';
import { findIndex, findWhere } from 'lodash';

var CHANGE_EVENT = 'change';

let _questions = [];

function loadQuestions (questions) {
	_questions = questions;
}

function createQuestion (question) {
	_questions.push(question);
}

function loadChoices (data) {
	const {questionId, choices} = data;
	const questionIndex = findIndex(_questions, 'id', parseInt(questionId));

	if (questionIndex >= 0)
		_questions[questionIndex].choices = choices;
}

class QuestionStore extends EventEmitter {
	constructor() {
		super();
	}

	getAll() {
		return _questions;
	}

	getOne(questionId) {
		return findWhere(_questions, {id: questionId});
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
		case QuestionConstants.QUESTION_LOAD_CHOICES:
			loadChoices(action.data);
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