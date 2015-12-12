import QuestionActions from '../actions/question';
import { callApi } from './utils';

export class QuestionService {
	static apiEndPoint = 'http://localhost:3000/api/v1/questions/'

	getAll() {
		return callApi(QuestionService.apiEndPoint).then(function (response) {
			QuestionActions.load(response.body);
		});
	}

	getChoices(questionId) {
		const endPoint = QuestionService.apiEndPoint + questionId +'/choices';
		return callApi(endPoint).then(function (response) {
			return response.body;
		}).catch(function (err) {
			console.log('error loading choices for question', err);
		});
	}
}

export default new QuestionService();