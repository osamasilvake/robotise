class EnvService {
	private dev = 'development';
	private prod = 'production';

	/**
	 * environment
	 */
	get env() {
		return process.env.NODE_ENV;
	}

	/**
	 * development: string
	 */
	get envDevelopment() {
		return this.dev;
	}

	/**
	 * development: boolean
	 */
	get envIsDevelopment() {
		return this.env === this.dev;
	}

	/**
	 * production: string
	 */
	get envProduction() {
		return this.prod;
	}

	/**
	 * production: boolean
	 */
	get envIsProduction() {
		return this.env === this.dev;
	}

	/**
	 * app name
	 */
	get envAppName() {
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
		return process.env.REACT_APP_API_VERSION || '';
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
		return process.env.REACT_APP_AUTH_REALM || '';
	}

	/**
	 * api url
	 */
	get envApiUrl() {
		return `${this.envBaseURL}/${this.envVersion}`;
	}
}
export default EnvService;
