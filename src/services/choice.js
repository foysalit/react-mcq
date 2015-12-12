import ChoiceActions from '../actions/answer';
import { callApi } from './utils';

export class ChoiceService {
	static apiEndPoint = 'http://localhost:3000/api/v1'

	getAll() {
		return callApi(ChoiceService.apiEndPoint).then(function (response) {
			ChoiceActions.load(response.body);
		});
	}
}

export default new ChoiceService();