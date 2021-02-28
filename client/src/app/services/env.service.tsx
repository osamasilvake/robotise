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
	get envName() {
		return process.env.REACT_APP_NAME?.toUpperCase();
	}

	/**
	 * author
	 */
	get envAuthor() {
		return process.env.REACT_APP_AUTHOR;
	}

	/**
	 * version
	 */
	get envVersion() {
		return process.env.REACT_APP_API_VERSION;
	}

	/**
	 * base URL
	 */
	get envBaseURL() {
		return process.env.REACT_APP_API_BASE_URL;
	}

	/**
	 * realm
	 */
	get envRealm() {
		return process.env.REACT_APP_AUTH_REALM;
	}

	/**
	 * api base url
	 */
	get envApiUrl() {
		return `${this.envBaseURL}/${this.envVersion}`;
	}
}
export default EnvService;
