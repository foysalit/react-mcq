import QuestionDispatcher from '../dispatchers/question';
import QuestionConstants from '../constants/question';
import QuestionService from '../services/question';

function questionLoader(questions) {
	return QuestionDispatcher.handleViewAction({
		actionType: QuestionConstants.QUESTION_LOAD,
		data: questions
	});
}

export default {
	create: function(question) {
		QuestionDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_CREATE,
			data: question
		});
	},

	edit: function(question) {
		QuestionDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_EDIT,
			data: question
		});
	},

	save: function(question) {
		QuestionDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_SAVE,
			data: question
		});
	},


	remove: function(removeId) {
		QuestionDispatcher.handleViewAction({
			actionType: QuestionConstants.QUESTION_REMOVE,
			data: removeId
		});
	},

	load: function(question) {
		if (question)
			questionLoader([question]);
		else
			QuestionService.getAll().then(questionLoader);
	},

	loadChoices: function (questionId) {
		return QuestionService.getChoices(questionId).then((choices) => {
			return QuestionDispatcher.handleViewAction({
				actionType: QuestionConstants.QUESTION_LOAD_CHOICES,
				data: {questionId, choices}
			});
		});
	},
};
