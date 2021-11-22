import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Loader from '../../components/common/loader/Loader';
import { isPrivate } from '../../routes/types';
import { AppConfigService } from '../../services';
import { authSelector } from '../../slices/authentication/Auth.slice';
import AuthGuard from './Auth.guard';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = (props) => {
	const { route, template, type } = props;

	const auth = useSelector(authSelector);

	const isUser = !!(auth.user && auth.user.data.user_id);

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
	}
	return <AuthGuard template={template} route={route} type={type} />;
};
export default Auth;
