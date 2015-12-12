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

	loadChoices: function (questionId) {
		return QuestionService.getChoices(questionId).then((choices) => {
			AppDispatcher.handleViewAction({
				actionType: QuestionConstants.QUESTION_LOAD_CHOICES,
				data: {questionId, choices}
			});
		});
	},
};