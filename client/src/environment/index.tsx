import { ApiEnv } from '../app/services';
import development from './development';
import production from './production';

const ENV = () => {
	switch (ApiEnv.env) {
		case 'production':
			return production;
		default:
			return development;
	}
};
export default ENV;
