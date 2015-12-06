import ExamDispatcher from '../dispatchers/exam';
import ExamConstants from '../constants/exam';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';

let _exams = [];

function loadExams (exams) {
	_exams = exams;
}

class ExamStore extends EventEmitter {
	constructor() {
		super();
	}

	getAll() {
		return _exams;
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

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;