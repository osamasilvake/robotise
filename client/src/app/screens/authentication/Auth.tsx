import React, { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import ENV from '../../../environment';
import Loader from '../../components/loader/Loader';
import GlobalLayout from '../../layouts/GlobalLayout';
import { RouteTypeEnum } from '../../routes/Routes.enum';
import { LayoutPageProperties, RouteProperties } from '../../routes/Routes.interfaces';
import { isPrivate, isSession } from '../../routes/types';
import { authSelector, validateLogin } from '../../slices/auth/Auth.slice';
import Error403 from '../pages/403/Error403';

interface AuthProperties<T = ReactNode> {
	appRoute: RouteProperties;
	Template: FC<LayoutPageProperties>;
	route: RouteComponentProps<T>;
	type: RouteTypeEnum;
}

const Auth: FC<AuthProperties> = ({ appRoute, Template, route, type }: AuthProperties) => {
	const dispatch = useDispatch();
	const { loading, response, errors } = useSelector(authSelector);

	useEffect(() => {
		dispatch(validateLogin());
	}, [dispatch]);

	const user = response && response.uuid;
	const error = errors && errors.status;

	/**
	 * authentication state
	 * 0-init: loading
	 * 1-success: dashboard
	 * 2-error: login
	 */

	console.log(loading);
	if (loading) {
		return <Loader />;
	} else if (isPrivate(type) && error && !user) {
		return <GlobalLayout Component={Error403} route={route} />;
	} else if (isSession(type) && user) {
		return <Redirect to={ENV().ROUTING.PACKAGES.DASHBOARD} />;
	} else {
		const Layout = appRoute.template ? appRoute.template : Template;
		return <Layout Component={appRoute.component} route={route} />;
	}
};
export default Auth;
