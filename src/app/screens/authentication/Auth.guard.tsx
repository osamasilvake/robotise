import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

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
	const { route, template } = props;

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

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
			sites.content && !robotTwinsSummary.content && dispatch(RobotTwinsSummaryFetchList());
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
		const intendedUrl = StorageService.get(AppConfigService.StorageItems.IntendedURL);
		const defaultUrl = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.MAIN;
		setTimeout(() =>
			StorageService.remove(
				AppConfigService.StorageItems.IntendedURL,
				StorageTypeEnum.SESSION
			)
		);
		return <Navigate replace to={intendedUrl || defaultUrl} />;
	}
	const Template = route.template ? route.template : template;
	return <Template Component={route.component} />;
};
export default AuthGuard;
