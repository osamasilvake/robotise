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
					const status = err.response && err.response.status;
					if (status === 401) {
						// clear authentication
						AuthService.authLogout();
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
