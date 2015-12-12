import ExamDispatcher from '../dispatchers/exam';
import ExamConstants from '../constants/exam';
import { EventEmitter } from 'events';
import { findIndex, findWhere } from 'lodash';

var CHANGE_EVENT = 'change';

let _exams = [];

function loadExams (exams) {
	_exams = exams;
}

function loadQuestions (data) {
	const {examId, questions} = data;
	const examIndex = findIndex(_exams, 'id', parseInt(examId));

	if (examIndex >= 0)
		_exams[examIndex].questions = questions;
}

class ExamStore extends EventEmitter {
	constructor() {
		super();
	}

	getAll() {
		return _exams;
	}

	getOne(examId) {
		console.log(_exams);
		return findWhere(_exams, {id: parseInt(examId)});
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

const store = new ExamStore();

ExamDispatcher.register(function(payload){
	const action = payload.action;

	switch(action.actionType) {

		// Respond to RECEIVE_DATA action
		case ExamConstants.EXAM_LOAD:
			loadExams(action.data);
			break;

		case ExamConstants.EXAM_LOAD_QUESTIONS:
			loadQuestions(action.data);
			break;

		case ExamConstants.EXAM_LOAD_ONE:
			loadExams([action.data]);
			break;

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;