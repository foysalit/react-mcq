import AppDispatcher from '../dispatchers/app';
import QuestionConstants from '../constants/question';
import QuestionService from '../services/question';

export default {
	create: function(question) {
		AppDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_CREATE,
			data: question
		});
	},

	edit: function(question) {
		AppDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_EDIT,
			data: question
		});
	},

	save: function(question) {
		AppDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_SAVE,
			data: question
		});
	},


	remove: function(removeId) {
		AppDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_REMOVE,
			data: removeId
		});
	},

	loadForExam: function (examId) {
		QuestionService.getForExam()
		AppDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_LOAD,
			data: examId
		});
	},
};