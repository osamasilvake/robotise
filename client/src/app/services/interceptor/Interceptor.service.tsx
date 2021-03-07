import axios from 'axios';

import AuthService from '../../screens/authentication/Auth.service';
import { LoggerService } from '..';

class InterceptorService {
	init() {
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

					// log error on console
					// send logs to server
					LoggerService.sendLogs(err);

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
