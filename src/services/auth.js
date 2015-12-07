import * as Http from 'superagent';

export class AuthService {
	static apiEndPoint = 'http://localhost:3000/api/v1/auth'
	static headersKey = 'http://localhost:3000/api/v1/auth'

	setHeaders(headers) {
		localStorage.setItem(AuthService.headersKey, JSON.stringify(headers));
	}

	getHeaders() {
		let headers = localStorage.getItem(AuthService.headersKey);
		return headers ? JSON.parse(headers) : null;
	}

	callApi(url, credentials) {
		return new Promise((resolve, reject) => {
			Http.post(url).send(credentials).end((err, response) => {
				if (err)
					return reject(response.body.errors);

				this.setHeaders(response.headers);
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