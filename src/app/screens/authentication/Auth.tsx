import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../../components/common/loader/Loader';
import { isPrivate, isSession } from '../../routes/types';
import { AppConfigService } from '../../services';
import { AuthRefreshToken, authSelector } from '../../slices/auth/Auth.slice';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../slices/robot-twins/RobotTwinsSummary.slice';
import { SitesFetchList, sitesSelector } from '../../slices/sites/Sites.slice';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = ({ appRoute, template, route, type }: AuthInterface) => {
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const isUser = !!(auth.user && auth.user.data.user_id);

	useEffect(() => {
		/**
		 * execute
		 * 1. validate and refresh access_token
		 * 2. load sites
		 * 3. load and refresh robot-twins summary
		 */
		const executeServices = () => {
			if (auth.user) {
				// dispatch: requests a new token before it expires
				dispatch(AuthRefreshToken(auth.user.exp));

				// dispatch: fetch sites
				!sites.content && dispatch(SitesFetchList());

				// dispatch: fetch robot twins summary
				sites.content && dispatch(RobotTwinsSummaryFetchList(!!robotTwinsSummary.content));
			}
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
	 * loader: 	Loader
	 * user: 	Dashboard
	 * !user: 	Login
	 */

	if (auth.loader) {
		return <Loader />;
	} else if (isPrivate(type) && !isUser) {
		return <Redirect to={AppConfigService.AppRoutes.AUTH.LOGIN} />;
	} else if (isSession(type) && isUser) {
		return <Redirect to={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD} />;
	} else {
		const Layout = appRoute.template ? appRoute.template : template;
		return <Layout Component={appRoute.component} route={route} />;
	}
};
export default Auth;
