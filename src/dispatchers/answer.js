import { Dispatcher } from 'flux';

class AnswerDispatcher extends Dispatcher {
	handleViewAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
};

export default new AnswerDispatcher();