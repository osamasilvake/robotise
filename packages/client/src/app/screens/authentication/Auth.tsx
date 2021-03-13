import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ENV from '../../../environment';
import Loader from '../../components/common/loader/Loader';
import { isPrivate, isSession } from '../../routes/types';
import { AuthRefreshToken, authSelector } from '../../slices/auth/Auth.slice';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = ({ appRoute, template, route, type }: AuthInterface) => {
	const dispatch = useDispatch();
	const { loading, user } = useSelector(authSelector);

	const isUser = !!(user && user.data.user_id);

	useEffect(() => {
		if (user) {
			// dispatch: requests a new token before it expires
			dispatch(AuthRefreshToken(user.exp));
		}
	}, [dispatch, user]);

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
		return <Redirect to={ENV().ROUTING.AUTH.LOGIN} />;
	} else if (isSession(type) && isUser) {
		return <Redirect to={ENV().ROUTING.SCREENS.BUSINESS.DASHBOARD} />;
	} else {
		const Layout = appRoute.template ? appRoute.template : template;
		return <Layout Component={appRoute.component} route={route} />;
	}
};
export default Auth;
