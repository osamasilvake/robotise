import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import Loader from '../../components/common/loader/Loader';
import { isPrivate } from '../../routes/types';
import { AppConfigService } from '../../services';
import { AuthRefreshToken, authSelector } from '../../slices/authentication/Auth.slice';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = (props) => {
	const { route, template, type } = props;

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	const location = useLocation();
	const isUser = !!(auth.user && auth.user.data.user_id);

	useEffect(() => {
		/**
		 * validate and refresh access_token
		 */
		const actions = () => {
			// dispatch: requests a new token before it expires
			auth?.user && dispatch(AuthRefreshToken(auth.user.exp));
		};

		// init
		auth?.user && actions();

		// interval
		const intervalId = window.setInterval(
			actions,
			AppConfigService.AppOptions.screens.authentication.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, auth.user]);

	/**
	 * authentication state
	 *
	 * loader: 						Loader
	 * !user + private + !login: 	Login
	 * !user + !private: 			Route
	 * login:						Intended URL
	 * others:						Route
	 */
	if (auth.loader) {
		return <Loader />;
	} else if (!isUser) {
		if (type && isPrivate(type) && route.path !== AppConfigService.AppRoutes.AUTH.LOGIN) {
			const condition = route.path !== AppConfigService.AppRoutes.HOME;
			return (
				<Navigate
					to={AppConfigService.AppRoutes.AUTH.LOGIN}
					state={{ intendedUrl: condition && location.pathname }}
					replace
				/>
			);
		}
		const Template = route.template || template;
		return <Template Component={route.component} />;
	} else if (route.path === AppConfigService.AppRoutes.AUTH.LOGIN) {
		const defaultUrl = AppConfigService.AppRoutes.HOME;
		return <Navigate to={location.state?.intendedUrl || defaultUrl} />;
	}
	const Template = route.template || template;
	return <Template Component={route.component} />;
};
export default Auth;
