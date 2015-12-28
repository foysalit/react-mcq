import AuthDispatcher from '../dispatchers/auth';
import AuthConstants from '../constants/auth';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';

let _user = {};
let _errors = [];

function loadErrors (errors) {
	_errors = errors;
}

function setUser (user) {
	_user = user;
	_errors = [];
}

class AuthStore extends EventEmitter {
	constructor() {
		super();
	}

	getUser() {
		return _user;
	}

	isLoggedIn() {
		return Object.keys(_user).length > 0;
	}

	getErrors() {
		return _errors;
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

const store = new AuthStore();

AuthDispatcher.register(function(payload){
	const action = payload.action;

	switch(action.actionType) {

		// Respond to RECEIVE_DATA action
		case AuthConstants.AUTH_LOGIN:
			setUser(action.data);
			break;

		// Respond to RECEIVE_DATA action
		case AuthConstants.AUTH_ERROR:
			loadErrors(action.data);
			setUser({});
			break;

		default:
			return true;
	}

	store.emitChange();

	return true;
});

export default store;
