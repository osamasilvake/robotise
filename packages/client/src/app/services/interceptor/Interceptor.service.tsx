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
					// stop repetition in-case of:
					// 1: network failure
					// 2: logs api fails
					const condition1 = config?.url !== undefined;
					const condition2 = config?.url !== AppConfigService.AppServices.COMMON.LOGS;
					if (condition1 && condition2) {
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
