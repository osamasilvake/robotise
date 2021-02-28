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
	const { loading, response, errors } = useSelector(authSelector);

	useEffect(() => {
		dispatch(AuthValidateLogin());
	}, [dispatch]);

	const user = response && response.uuid;
	const error = errors && errors.status;

	/**
	 * authentication state
	 *
	 * loading: Loader
	 * success: Dashboard
	 * error: 	Login
	 */

	if (loading) {
		return <Loader />;
	} else if (isPrivate(type) && !user && error) {
		return <Redirect to={ENV().ROUTING.AUTH.LOGIN} />;
	} else if (isSession(type) && user) {
		return <Redirect to={ENV().ROUTING.PACKAGES.DASHBOARD} />;
	} else {
		const Layout = appRoute.template ? appRoute.template : template;
		return <Layout Component={appRoute.component} route={route} />;
	}
};
export default Auth;
