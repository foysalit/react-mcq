import { Dispatcher } from 'flux';

class QuestionDispatcher extends Dispatcher {
	handleViewAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
};

export default new QuestionDispatcher();