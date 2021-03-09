import { AppConfigService } from '../app/services';
import development from './development';
import production from './production';

const ENV = () => {
	switch (AppConfigService.env) {
		case AppConfigService.envProduction:
			return production;
		default:
			return development;
	}
};
export default ENV;
