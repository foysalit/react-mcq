import ExamActions from '../actions/exam';
import { callApi } from './utils';

export class ExamService {
	static apiEndPoint = 'http://localhost:3000/api/v1/exams'

	getAll() {
		return callApi(ExamService.apiEndPoint).then(function (response) {
			ExamActions.load(response.body);
		});
	}
}

export default new ExamService();