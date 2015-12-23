import ChoiceDispatcher from '../dispatchers/choice';
import ChoiceConstants from '../constants/choice';
import { EventEmitter } from 'events';
import { findIndex, findWhere } from 'lodash';

var CHANGE_EVENT = 'change';

let _choices = [];

function loadChoices (choices) {
	_choices = choices;
}

function createChoice (choice) {
	_choices.push(choice);
}

class ChoiceStore extends EventEmitter {
	constructor() {
		super();
	}

	getAll() {
		return _choices;
	}

	getOne(choiceId) {
		return findWhere(_choices, {id: choiceId});
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

const store = new ChoiceStore();

ChoiceDispatcher.register(function(payload){
	const action = payload.action;

	switch(action.actionType) {

		// Respond to RECEIVE_DATA action
		case ChoiceConstants.CHOICE_LOAD:
			loadChoices(action.data);
			break;
		case ChoiceConstants.CHOICE_CREATE:
			createChoice(action.data);
			break;

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;
