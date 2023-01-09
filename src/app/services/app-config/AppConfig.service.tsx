import appRoutes from '../../routes/Routes.path';
import EnvService from '../env/Env.service';
import AppServices from './AppConfig.apis';
import AppOptions from './AppConfig.options';

class AppConfigService extends EnvService {
	/**
	 * options
	 */
	get AppOptions() {
		return AppOptions(this);
	}

	/**
	 * routes
	 */
	get AppRoutes() {
		return appRoutes;
	}

	/**
	 * routes scope
	 */
	get AppRoutesScope() {
		return {
			PURCHASES: 'orderReports',
			MIDDLEWARE_CONFIG: 'cmdEvents'
		};
	}

	/**
	 * services
	 */
	get AppServices() {
		return AppServices(this);
	}

	/**
	 * local/session storage
	 */
	get StorageItems() {
		return {
			JWTAccessToken: 'roc_access_token',
			JWTAccessTokenExpiry: 'roc_access_token_expiry',
			ThemePalette: 'roc_theme_palette',
			ChangeLanguage: 'roc_change_language',
			DrawerState: 'roc_drawer_state',
			IntendedURL: 'roc_intended_url',
			SitesState: 'roc_sites_state',
			RobotsState: 'roc_robots_state'
		};
	}

	/**
	 * links
	 */
	get AppImageURLs() {
		return {
			logo: {
				icon: '/assets/svg/logos/robotise-icon.svg',
				iconOff: '/assets/svg/logos/robotise-icon-off.svg',
				name: '/assets/svg/logos/robotise-name.svg'
			},
			avatar: {
				path: '/assets/svg/avatars/avatar.svg',
				name: 'avatar'
			},
			robotise: {
				format: '.jpg',
				path: '/assets/images/robotise/'
			},
			languages: {
				format: '.svg',
				path: '/assets/svg/languages/'
			}
		};
	}

	/**
	 * headers
	 */
	get AppRequestHeaders() {
		return {
			json: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			form: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
	}
}
const instance = new AppConfigService();
export default instance;
