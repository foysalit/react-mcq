import * as Http from 'superagent';
import AuthService from './auth';

export function callApi (url, method, data) {
	const headers = AuthService.getHeaders();
	console.log(headers);

	return new Promise((resolve, reject) => {
		let request = null;

		switch (method) {
			case 'POST': 
				request = Http.post(url).send(data)
				break;

			case 'GET':
				request = Http.get(url);
				break;

			default:
				request = Http.get(url);
		}

		request
			.set(headers)
			.end((err, response) => {
				return err ? reject(err) : resolve(response);
			});
	});
}