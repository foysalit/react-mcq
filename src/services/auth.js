import * as Http from 'superagent';
import { pick } from 'lodash';

export class AuthService {
	static apiEndPoint = 'http://localhost:3000/api/v1/auth'
	static headersKey = 'auth.headers'
	static userKey = 'auth.user'

	setHeaders(headers) {
		localStorage.setItem(AuthService.headersKey, JSON.stringify(headers));
	}

	setUser(user) {
		localStorage.setItem(AuthService.userKey, JSON.stringify(user));
	}

	getHeaders() {
		let headers = localStorage.getItem(AuthService.headersKey);
		return headers ? JSON.parse(headers) : null;
	}

	getUser() {
		let user = localStorage.getItem(AuthService.userKey);
		return user ? JSON.parse(user) : null;
	}

	callApi(url, credentials) {
		return new Promise((resolve, reject) => {
			Http.post(url).send(credentials).end((err, response) => {
				if (err)
					return reject(response.body.errors);

				this.setHeaders(response.headers);
				this.setUser(response.body.data);
				return resolve(response.body.data);
			});
		});
	}

	validate() {
		const endpoint = `${AuthService.apiEndPoint}/validate_token`;
		return new Promise((resolve, reject) => {
			const params = pick(this.getHeaders(), ['uid', 'client', 'access-token']);
			Http.get(endpoint).query(params).end((err, response) => {
				if (err)
					return reject(response.body.errors);

				this.setUser(response.body.data);
				return resolve(response.body.data);
			});
		});
	}

	signin(credentials) {
		const endpoint = `${AuthService.apiEndPoint}/sign_in`;
		return this.callApi(endpoint, credentials);
	}

	signup(credentials) {
		return this.callApi(AuthService.apiEndPoint, credentials);
	}
}

export default new AuthService();
