import axios, { AxiosError } from 'axios';

import { AppConfigService, LoggerService } from '..';

class InterceptorService {
	init() {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(err: AxiosError) => {
				return new Promise((_resolve, reject) => {
					const response = err.response;
					const data = response?.data;
					const config = response?.config;

					// log error on console
					// send logs to server
					// stop repetition in-case if logs api fails
					if (config?.url !== AppConfigService.AppServices.COMMON.LOGS) {
						LoggerService.sendLogs(err);
					}

					// reject
					reject(data);
				});
			}
		);
	}
}
const instance = new InterceptorService();
export default instance;
