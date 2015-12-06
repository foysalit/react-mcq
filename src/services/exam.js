import * as Http from 'superagent';
import ExamActions from '../actions/exam';

export class ExamService {
	static apiEndPoint = 'http://localhost:3000/api/v1/exams'

	getAll() {
		return Http.get(ExamService.apiEndPoint).end(function (err, exams) {
			ExamActions.load(exams.body);
		});
	}
}

export default new ExamService();