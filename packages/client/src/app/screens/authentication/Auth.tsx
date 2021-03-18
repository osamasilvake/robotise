import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../../components/common/loader/Loader';
import { isPrivate, isSession } from '../../routes/types';
import { AppConfigService } from '../../services';
import { AuthRefreshToken, authSelector } from '../../slices/auth/Auth.slice';
import {
	RobotTwinsSummaryRefreshList,
	robotTwinsSummarySelector
} from '../../slices/robot-twins/RobotTwinsSummary.slice';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = ({ appRoute, template, route, type }: AuthInterface) => {
	const dispatch = useDispatch();
	const { loading, user } = useSelector(authSelector);
	const { content } = useSelector(robotTwinsSummarySelector);

	const isUser = !!(user && user.data.user_id);

	useEffect(() => {
		const init = () => {
			if (user) {
				// dispatch: requests a new token before it expires
				dispatch(AuthRefreshToken(user.exp));

				// dispatch: refresh robot twins summary
				dispatch(
					RobotTwinsSummaryRefreshList(
						content?.backup?.sites ? content.backup.sites : null
					)
				);
			}
		};
		window.addEventListener('load', init);
		const timeoutID = window.setInterval(
			init,
			AppConfigService.AppOptions.screens.robots.robotTwinsRefreshInMs
		);

		return () => window.clearInterval(timeoutID);
	}, [dispatch, content, user]);

	/**
	 * authentication state
	 *
	 * loading: Loader
	 * user: 	Dashboard
	 * !user: 	Login
	 */

	if (loading) {
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
