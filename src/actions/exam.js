import ExamDispatcher from '../dispatchers/exam';
import ExamConstants from '../constants/exam';
import ExamService from '../services/exam';

export default {
	create: function(exam) {
		return ExamService.create(exam).then((createdExam) => {
			ExamDispatcher.handleViewAction({
				actionType: ExamConstants.EXAM_CREATE,
				data: createdExam
			});
			return createdExam;
		})
	},

	edit: function(exam) {
		ExamDispatcher.handleViewAction({
			actionType: ExamConstants.EXAM_EDIT,
			data: exam
		});
	},

	save: function(exam) {
		ExamService.save(exam).then(() => {
			ExamDispatcher.handleViewAction({
				actionType: ExamConstants.EXAM_SAVE,
				data: exam
			});
		})
	},


	remove: function(removeId) {
		ExamDispatcher.handleViewAction({
			actionType: ExamConstants.EXAM_REMOVE,
			data: removeId
		});
	},

	load: function (exams) {
		ExamDispatcher.handleViewAction({
			actionType: ExamConstants.EXAM_LOAD,
			data: exams
		});
	},

	loadOne: function (examId) {
		return ExamService.getOne(examId).then(function (exam) {
			return ExamDispatcher.handleViewAction({
				actionType: ExamConstants.EXAM_LOAD_ONE,
				data: exam
			});
		});
	},

	loadQuestions: function (examId) {
		ExamService.getQuestions(examId).then(function (questions) {
			ExamDispatcher.handleViewAction({
				actionType: ExamConstants.EXAM_LOAD_QUESTIONS,
				data: {examId, questions}
			});
		});
	}
};
