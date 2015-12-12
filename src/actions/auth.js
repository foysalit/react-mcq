import AuthDispatcher from '../dispatchers/auth';
import AuthConstants from '../constants/auth';
import AuthService from '../services/auth';

export default {
	showError(err) {
		console.log('error in auth service', err);	
	},

	signin: function (credentials) {
		AuthService.signin(credentials).then((data) => {
			AuthDispatcher.handleViewAction({
				actionType: AuthConstants.AUTH_LOGIN,
				data: data
			});
		}).catch((errors) => {
			AuthDispatcher.handleViewAction({
				actionType: AuthConstants.AUTH_ERROR,
				data: errors
			});
		});
	},

	signup: function (credentials) {
		AuthService.signup(credentials).then((data) => {
			AuthDispatcher.handleViewAction({
				actionType: AuthConstants.AUTH_LOGIN,
				data: data
			});
		}).catch((errors) => {
			AuthDispatcher.handleViewAction({
				actionType: AuthConstants.AUTH_ERROR,
				data: errors
			});
		});
	},

	checkUser: function () {
		return AuthService.validate().then((data) => {
			console.log(data);
			AuthDispatcher.handleViewAction({
				actionType: AuthConstants.AUTH_LOGIN,
				data: data
			});
		}).catch((errors) => {
			AuthDispatcher.handleViewAction({
				actionType: AuthConstants.AUTH_ERROR,
				data: errors
			});
		});
	}
};