import ExamActions from '../actions/exam';
import { callApi } from './utils';

export class ExamService {
	static apiEndPoint = 'http://localhost:3000/api/v1/exams/'

	getAll() {
		return callApi(ExamService.apiEndPoint).then(function (response) {
			ExamActions.load(response.body);
		});
	}

	getOne(examId) {
		const endPoint = ExamService.apiEndPoint + examId;
		return callApi(endPoint).then(function (response) {
			return response.body;
		}).catch(function (err) {
			console.log('error loading single exam', err);
		});
	}

	create(exam) {
		return callApi(ExamService.apiEndPoint, 'POST', {exam: exam}).then(function	(response) {
			console.log(response.body);
			return response.body;
		}).catch(function (err) {
			console.log('error creating exam', err);
		});
	}

	save(exam) {
		const endPoint = ExamService.apiEndPoint + exam.id;
		return callApi(endPoint, 'PUT', {exam: exam}).then(function	(response) {
			console.log(response.body);
		}).catch(function (err) {
			console.log('error saving exam', err);
		});
	}

	getQuestions(examId) {
		const endPoint = ExamService.apiEndPoint + examId +'/questions';
		return callApi(endPoint).then(function (response) {
			return response.body;
		}).catch(function (err) {
			console.log(err);
		});
	}
}

export default new ExamService();
