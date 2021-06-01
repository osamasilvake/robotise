import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppConfigService, StorageService } from '../../services';
import { AuthRefreshToken, authSelector } from '../../slices/auth/Auth.slice';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../slices/robot-twins/RobotTwinsSummary.slice';
import { SitesFetchList, sitesSelector } from '../../slices/sites/Sites.slice';
import { AuthInterface } from './Auth.interface';

const AuthGuard: FC<AuthInterface> = (props) => {
	const { appRoute, template, route } = props;

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		/**
		 * execute
		 * 0. remove intended_url from session storage
		 * 1. validate and refresh access_token
		 * 2. load sites
		 * 3. load and refresh robot-twins summary
		 */
		const executeServices = () => {
			// remove intended url from session session
			StorageService.remove(AppConfigService.StorageItems.IntendedURL);

			// dispatch: requests a new token before it expires
			auth?.user && dispatch(AuthRefreshToken(auth.user.exp));

			// dispatch: fetch sites
			!sites.content && dispatch(SitesFetchList());

			// dispatch: fetch robot twins summary
			sites.content && dispatch(RobotTwinsSummaryFetchList(!!robotTwinsSummary.content));
		};

		// init
		!robotTwinsSummary.content && executeServices();

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.robots.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, auth.user, sites.content, robotTwinsSummary.content]);

	/**
	 * authentication state
	 *
	 * login route:     Robots
	 * others:		    Intended Route
	 */

	if (appRoute.path === AppConfigService.AppRoutes.AUTH.LOGIN) {
		const intendedUrl = StorageService.get(AppConfigService.StorageItems.IntendedURL);
		const defaultUrl = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN;
		return <Redirect to={intendedUrl || defaultUrl} />;
	}
	const Layout = appRoute.template ? appRoute.template : template;
	return <Layout Component={appRoute.component} route={route} />;
};
export default AuthGuard;
