import { ApiEnv } from '.';

class BaseApi {
	/**
	 * app version
	 */
	get version() {
		return ApiEnv.version;
	}

	/**
	 * base url
	 */
	get baseUrl() {
		return ApiEnv.baseURL;
	}

	/**
	 * url path
	 * @param path
	 */
	getUrl(path = '') {
		return `${this.baseUrl}/${this.version}${path}`;
	}
}
export default BaseApi;
