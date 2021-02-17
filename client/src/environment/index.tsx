// app
import development from './development';
import production from './production';

/**
 * validate build environment
 */
const ENV = () => {
	switch (process.env.REACT_APP_ENV) {
		case 'production':
			return production;
		default:
			return development;
	}
};
export default ENV;
