import AnswerActions from '../actions/answer';
import { callApi } from './utils';

export class AnswerService {
	static apiEndPoint = 'http://localhost:3000/api/v1/answers'

	getAll() {
		return callApi(AnswerService.apiEndPoint).then(function (response) {
			AnswerActions.load(response.body);
		});
	}
}

export default new AnswerService();