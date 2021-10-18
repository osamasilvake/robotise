import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { AuthRefreshToken, authSelector } from '../../slices/authentication/Auth.slice';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../slices/business/robots/RobotTwinsSummary.slice';
import { SitesFetchList, sitesSelector } from '../../slices/business/sites/Sites.slice';
import { AuthInterface } from './Auth.interface';

const AuthGuard: FC<AuthInterface> = (props) => {
	const { appRoute, template, route } = props;

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		/**
		 * actions
		 * 1. validate and refresh access_token
		 */
		const actions = () => {
			// dispatch: requests a new token before it expires
			auth?.user && dispatch(AuthRefreshToken(auth.user.exp));
		};

		// interval
		const intervalId = window.setInterval(
			actions,
			AppConfigService.AppOptions.screens.authentication.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, auth.user]);

	useEffect(() => {
		/**
		 * actions
		 * 1. load and refresh sites
		 * 2. load and refresh robot-twins summary
		 */
		const actions = () => {
			// dispatch: fetch sites
			!sites.content && dispatch(SitesFetchList());

			// dispatch: fetch robot twins summary
			sites.content && !robotTwinsSummary.content && dispatch(RobotTwinsSummaryFetchList());
		};
		!robotTwinsSummary.content && actions();
	}, [dispatch, auth.user, sites.content, robotTwinsSummary.content]);

	/**
	 * authentication state
	 *
	 * login:		Robots
	 * others:		Route
	 */
	if (appRoute.path === AppConfigService.AppRoutes.AUTH.LOGIN) {
		const intendedUrl = StorageService.get(AppConfigService.StorageItems.IntendedURL);
		const defaultUrl = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN;
		setTimeout(() =>
			StorageService.remove(
				AppConfigService.StorageItems.IntendedURL,
				StorageTypeEnum.SESSION
			)
		);
		return <Redirect to={intendedUrl || defaultUrl} />;
	}
	const Layout = appRoute.template ? appRoute.template : template;
	return <Layout Component={appRoute.component} route={route} />;
};
export default AuthGuard;
