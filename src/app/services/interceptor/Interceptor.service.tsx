import axios, { AxiosError } from 'axios';

import { AppConfigService, LoggerService } from '..';

class InterceptorService {
	init() {
		axios.interceptors.response.use(
			(response) => response,
			(err: AxiosError) => {
				return new Promise((resolve, reject) => {
					const response = err.response;
					const data = response?.data;
					const config = response?.config;

					// stop repetition in-case of:
					// 1: network failure
					// 2: logs api fails
					// 3: forbidden (un-authorize)
					const condition1 = config?.url !== undefined;
					const condition2 = config?.url !== AppConfigService.AppServices.COMMON.LOGS;
					const condition3 = response?.status !== 403;
					if (condition1 && condition2 && condition3) {
						// log error on console
						// send logs to server
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
