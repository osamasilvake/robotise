import log from 'loglevel';
import moment from 'moment';

import { jsonParse, jsonStringify } from '../../utilities/methods/JsonUtilities';
import { get } from '../../utilities/methods/ObjectUtilities';
import { AppConfigService, HttpClientService, StorageService } from '..';
import { LogInterface } from './Logger.interface';

class LoggerService {
	private mapKeys = [
		{ key: 'message', prop: 'message' },
		{ key: 'config.method', prop: 'method' },
		{ key: 'name', prop: 'name' },
		{ key: 'stack', prop: 'stacktrace' },
		{ key: 'response.status', prop: 'status' },
		{ key: 'response.data', prop: 'payload' },
		{ key: 'config.url', prop: 'url' }
	];

	/**
	 * set log level based on environment
	 */
	init() {
		if (AppConfigService.env === AppConfigService.envProduction) {
			log.setLevel(log.levels.WARN);
		} else {
			log.setLevel(log.levels.TRACE);
		}
	}

	/**
	 * send logs to the server
	 * @param err
	 */
	sendLogs = <T,>(err: T) => {
		// create log payload
		const errorLog = this.createLog(err);

		// log error on console
		log.error(errorLog);

		// send logs to the server
		const request: LogInterface[] = [
			{
				env: AppConfigService.env,
				level: AppConfigService.envIsDevelopment ? 'trace' : 'warn',
				token: StorageService.get(AppConfigService.AppLocalStorageItems.JWTAccessToken),
				url: window.location.href,
				version: AppConfigService.envVersion,
				timestamp: moment().toISOString(),
				origin: 'roc-app-client',
				...jsonParse(errorLog.toString())
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
	 * create the log
	 * @param log
	 * @param stringify
	 */
	createLog = <T,>(log: T, stringify = true) => {
		const data = this.mapKeys.reduce<Record<string, string>>((acc, item) => {
			const key = item.prop;
			const value = get(log, item.key);
			if (value) {
				if (key === 'payload') {
					acc[key] = jsonStringify(value);
				} else {
					acc[key] = value;
				}
			}
			return acc;
		}, {});
		return stringify ? jsonStringify(data) : data;
	};
}
const instance = new LoggerService();
export default instance;
