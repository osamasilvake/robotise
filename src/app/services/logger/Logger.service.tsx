import { AxiosError } from 'axios';
import log from 'loglevel';

import { dateISOString } from '../../utilities/methods/Date';
import { AppConfigService, HttpClientService, StorageService } from '..';
import { LogErrorInterface, LogInterface } from './Logger.interface';

class LoggerService {
	/**
	 * set log level based on environment
	 */
	init() {
		if (AppConfigService.envProd) {
			log.setLevel(log.levels.WARN);
		} else {
			log.setLevel(log.levels.TRACE);
		}
	}

	/**
	 * send logs to the server
	 * @param err
	 */
	sendLogs = (err: AxiosError) => {
		// create error log
		const errorLog: LogErrorInterface = this.createErrorLog(err);

		// log error on console
		log.error(errorLog);

		// send logs to the server
		const request: LogInterface[] = [
			{
				apiVersion: AppConfigService.envApiVersion,
				appVersion: AppConfigService.envAppVersion,
				env: AppConfigService.env,
				origin: AppConfigService.envRealm,
				level: AppConfigService.envDev ? 'trace' : 'warn',
				pageUrl: window.location.href,
				token: StorageService.get(AppConfigService.StorageItems.JWTAccessToken),
				timestamp: dateISOString(),
				...errorLog
			}
		];
		HttpClientService.post(
			AppConfigService.AppServices.COMMON.LOGS,
			{
				logs: request
			},
			{
				headers: AppConfigService.AppRequestHeaders.json
			}
		);
	};

	/**
	 * create the error log
	 * @param log
	 */
	createErrorLog = (log: AxiosError): LogErrorInterface => ({
		name: log.name,
		message: log.message,
		stacktrace: log.stack || '',
		method: log.config?.method || '',
		status: log.response?.status || 0,
		payload: JSON.stringify(log.response?.data),
		url: log.config?.url || ''
	});
}
const instance = new LoggerService();
export default instance;
