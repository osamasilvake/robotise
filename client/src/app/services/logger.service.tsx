import log from 'loglevel';
import remote from 'loglevel-plugin-remote';

import { get } from '../utilities/methods/objects/get';
import { ConfigService, StorageService } from '.';
import { logInterface } from './index.interface';

class LoggerService {
	public mapKeys = [
		{ key: 'message', prop: 'message' },
		{ key: 'config.method', prop: 'method' },
		{ key: 'name', prop: 'name' },
		{ key: 'stack', prop: 'stacktrace' },
		{ key: 'response.status', prop: 'status' },
		{ key: 'response.data', prop: 'payload' },
		{ key: 'config.url', prop: 'url' }
	];

	init() {
		const options = {
			url: ConfigService.AppServices.COMMON.LOGS,
			method: 'POST',
			token: StorageService.get(ConfigService.AppLocalStorageItems.JWTAccessToken),
			level: ConfigService.envIsDevelopment ? 'trace' : 'warn',
			stacktrace: {
				levels: ['trace', 'warn', 'error'],
				depth: 5,
				excess: 0
			},
			format: (defaultLog: logInterface) => {
				const log = {
					...defaultLog,
					env: ConfigService.env,
					level: defaultLog.level.label,
					url: window.location.href,
					version: ConfigService.envVersion,
					origin: 'roc-app-client'
				};
				return {
					...log,
					...JSON.parse(defaultLog.message)
				};
			}
		};

		// apply log
		remote.apply(log, options);

		// set level based on environment
		if (ConfigService.env === ConfigService.envProduction) {
			log.setLevel(log.levels.WARN);
		} else {
			log.setLevel(log.levels.TRACE);
		}
	}

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
					acc[key] = JSON.stringify(value);
				} else {
					acc[key] = value;
				}
			}
			return acc;
		}, {});
		return stringify ? JSON.stringify(data, null, 4) : data;
	};
}
const instance = new LoggerService();
export default instance;
