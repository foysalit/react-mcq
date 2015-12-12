import AnswerDispatcher from '../dispatchers/answer';
import AnswerConstants from '../constants/answer';

export default {
	create: function(answer) {

		AnswerDispatcher.handleViewAction({
			actionType: AnswerConstants.ANSWER_CREATE,
			data: answer
		});
	},

	edit: function(answer) {
		AnswerDispatcher.handleViewAction({
			actionType: AnswerConstants.ANSWER_EDIT,
			data: answer
		});
	},

	save: function(answer) {
		AnswerDispatcher.handleViewAction({
			actionType: AnswerConstants.ANSWER_SAVE,
			data: answer
		});
	},


	remove: function(removeId) {
		AnswerDispatcher.handleViewAction({
			actionType: AnswerConstants.ANSWER_REMOVE,
			data: removeId
		});
	},

	load: function (answers) {
		AnswerDispatcher.handleViewAction({
			actionType: AnswerConstants.ANSWER_LOAD,
			data: answers
		});
	},
};