import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { AppConfigService } from '../../services';
import { AuthRefreshToken, authSelector } from '../../slices/authentication/Auth.slice';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../slices/business/robots/RobotTwinsSummary.slice';
import { SitesFetchList, sitesSelector } from '../../slices/business/sites/Sites.slice';
import { AuthInterface } from './Auth.interface';

const AuthGuard: FC<AuthInterface> = (props) => {
	const { route, template } = props;

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const location = useLocation();

	useEffect(() => {
		/**
		 * validate and refresh access_token
		 */
		const actions = () => {
			// dispatch: requests a new token before it expires
			auth?.user && dispatch(AuthRefreshToken(auth.user.exp));
		};

		// init
		actions();

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
			!robotTwinsSummary.content && dispatch(RobotTwinsSummaryFetchList());
		};
		!robotTwinsSummary.content && actions();
	}, [dispatch, sites.content, robotTwinsSummary.content]);

	/**
	 * authentication state
	 *
	 * login:		Intended URL
	 * others:		Route
	 */
	if (route.path === AppConfigService.AppRoutes.AUTH.LOGIN) {
		const defaultUrl = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN;
		return <Navigate to={location.state?.intendedUrl || defaultUrl} />;
	}
	const Template = route.template || template;
	return <Template Component={route.component} />;
};
export default AuthGuard;
