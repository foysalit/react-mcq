import QuestionActions from '../actions/question';
import { callApi } from './utils';

export class QuestionService {
	static apiEndPoint = 'http://localhost:3000/api/v1/'

	getAll() {
		return callApi(QuestionService.apiEndPoint).then(function (response) {
			QuestionActions.load(response.body);
		});
	}
}

export default new QuestionService();