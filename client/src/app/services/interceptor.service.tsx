import axios from 'axios';

import AuthService from '../screens/authentication/Auth.service';

class InterceptorService {
	setIntercertors() {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(err) => {
				return new Promise((_resolve, reject) => {
					// un-authorized access
					const status = err.response.status;
					const isRetryRequest = err.config.__isRetryRequest;
					if (status === 401 && !isRetryRequest) {
						AuthService.removeAccessToken();
					}

					// send logs
					// log.error(loggerService.createLog(err));

					reject(err);
				});
			}
		);
	}
}
const instance = new InterceptorService();
export default instance;
