import { ConfigService } from '../app/services';
import development from './development';
import production from './production';

const ENV = () => {
	switch (ConfigService.env) {
		case ConfigService.envProduction:
			return production;
		default:
			return development;
	}
};
export default ENV;
