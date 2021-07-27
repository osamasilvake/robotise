import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import Loader from '../../components/common/loader/Loader';
import { isPrivate } from '../../routes/types';
import { AppConfigService, StorageService } from '../../services';
import { StorageTypeEnum } from '../../services/storage/Storage.enum';
import { authSelector } from '../../slices/auth/Auth.slice';
import AuthGuard from './Auth.guard';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = (props) => {
	const { appRoute, template, route, type } = props;

	const auth = useSelector(authSelector);

	const location = useLocation();
	const isUser = !!(auth.user && auth.user.data.user_id);

	useEffect(() => {
		// case: keep intended location on memory during failed authentication.
		// after login the user will be redirected to the intended location.
		window.addEventListener(
			'DOMContentLoaded',
			() => {
				if (type && isPrivate(type) && !isUser && location.pathname.length > 1) {
					// storage: intended url
					StorageService.put(
						AppConfigService.StorageItems.IntendedURL,
						location.pathname,
						StorageTypeEnum.SESSION
					);
				}
			},
			{ once: true }
		);
	}, [isUser, location, type]);

	/**
	 * authentication state
	 *
	 * loader: 						Loader
	 * !user + private + !login: 	Login
	 * !user + !private: 			Route
	 * others:						Auth Guard
	 */
	if (auth.loader) {
		return <Loader />;
	} else if (!isUser) {
		if (type && isPrivate(type) && appRoute.path !== AppConfigService.AppRoutes.AUTH.LOGIN) {
			return <Redirect to={AppConfigService.AppRoutes.AUTH.LOGIN} />;
		}
		const Layout = appRoute.template ? appRoute.template : template;
		return <Layout Component={appRoute.component} route={route} />;
	}
	return <AuthGuard appRoute={appRoute} template={template} route={route} type={type} />;
};
export default Auth;
