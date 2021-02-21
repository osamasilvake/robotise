class EnvService {
	/**
	 * environment
	 */
	get env() {
		return process.env.REACT_APP_ENV;
	}

	/**
	 * name
	 */
	get name() {
		return process.env.REACT_APP_NAME?.toUpperCase();
	}

	/**
	 * author
	 */
	get author() {
		return process.env.REACT_APP_AUTHOR;
	}

	/**
	 * version
	 */
	get version() {
		return process.env.REACT_APP_API_VERSION;
	}

	/**
	 * base URL
	 */
	get baseURL() {
		return process.env.REACT_APP_API_BASE_URL;
	}

	/**
	 * realm
	 */
	get realm() {
		return process.env.REACT_APP_AUTH_REALM;
	}
}
const instance = new EnvService();
export default instance;
