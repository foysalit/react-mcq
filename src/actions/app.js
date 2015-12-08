import AppDispatcher from '../dispatchers/app';
import CommonConstants from '../constants/common';

export default {
	changeTitle: function (title) {
		AppDispatcher.handleViewAction({
			actionType: CommonConstants.CHANGE_APPBAR_TITLE,
			data: title
		});
	},
};