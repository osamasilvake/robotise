import { ApiEnv } from '.';

class BaseApi {
	/**
	 * base url
	 */
	get baseUrl() {
		return ApiEnv.baseURL;
	}

	/**
	 * app version
	 */
	get version() {
		return ApiEnv.version;
	}

	/**
	 * url path
	 * @param path
	 */
	getUrl(path = '') {
		return `${this.baseUrl}/${this.version}/${path}`;
	}
}
export default BaseApi;
