import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ENV from '../../../environment';
import Loader from '../../components/loader/Loader';
import { isPrivate, isSession } from '../../routes/types';
import { authSelector, AuthValidateLogin } from '../../slices/auth/Auth.slice';
import { AuthInterface } from './Auth.interface';

const Auth: FC<AuthInterface> = ({ appRoute, template, route, type }: AuthInterface) => {
	const dispatch = useDispatch();
	const { loading, user } = useSelector(authSelector);

	const isUser = !!(user && user.uuid);

	useEffect(() => {
		// dispatch: validate login
		dispatch(AuthValidateLogin());
	}, [dispatch]);

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
