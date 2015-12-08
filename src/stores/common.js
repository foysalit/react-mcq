import AppDispatcher from '../dispatchers/app';
import CommonConstants from '../constants/common';
import { EventEmitter } from 'events';
import { extend } from 'lodash/object';

var CHANGE_EVENT = 'change';

let _appbar = {
	title: 'Home'
};

function setAppbarData (data) {
	_appbar = extend(_appbar, data);
}

class CommonStore extends EventEmitter {
	constructor() {
		super();
	}

	getAppbarData() {
		return _appbar;
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

const store = new CommonStore();

AppDispatcher.register(function(payload){
	const action = payload.action;

	switch(action.actionType) {

		// Respond to RECEIVE_DATA action
		case CommonConstants.CHANGE_APPBAR_TITLE:
			setAppbarData({title: action.data});
			break;

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;