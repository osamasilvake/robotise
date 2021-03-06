import axios from 'axios';
import log from 'loglevel';

import AuthService from '../../screens/authentication/Auth.service';
import { LoggerService } from '..';

class InterceptorService {
	setIntercertors() {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(err) => {
				return new Promise((_resolve, reject) => {
					// un-authorize access
					const status = err.response && err.response.status;
					const isRetryRequest = err.config && err.config.__isRetryRequest;
					if (status === 401 && !isRetryRequest) {
						AuthService.authLogout();
					}

					// send logs to server
					log.error(LoggerService.createLog(err));

					// reject
					const data = err.response && err.response.data;
					reject(data);
				});
			}
		);
	}
}
const instance = new InterceptorService();
export default instance;
