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
	 * development
	 */
	get envDev() {
		return this.env === this.dev;
	}

	/**
	 * production
	 */
	get envProd() {
		return this.env === this.prod;
	}

	/**
	 * api base URL
	 */
	get envBaseURL() {
		return process.env.REACT_APP_API_BASE_URL;
	}

	/**
	 * api version
	 */
	get envApiVersion() {
		return process.env.REACT_APP_API_VERSION || '';
	}

	/**
	 * auth realm
	 */
	get envRealm() {
		return process.env.REACT_APP_AUTH_REALM || '';
	}

	/**
	 * app version
	 */
	get envAppVersion() {
		return process.env.REACT_APP_VERSION || '';
	}

	/**
	 * app url
	 */
	get envAppUrl() {
		return `${this.envBaseURL}/${this.envApiVersion}`;
	}

	/**
	 * app name
	 */
	get envAppName() {
		return process.env.REACT_APP_NAME?.toUpperCase() || '';
	}

	/**
	 * company name
	 */
	get envCompanyName() {
		return process.env.REACT_APP_COMPANY_NAME;
	}

	/**
	 * company url
	 */
	get envCompanyUrl() {
		return process.env.REACT_APP_COMPANY_URL || '';
	}

	/**
	 * alert docs url
	 */
	get envAlertDocsUrl() {
		return process.env.REACT_APP_ALERT_DOCS_URL || '';
	}
}
export default EnvService;
