import React, { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import ENV from '../../../environment';
import Loader from '../../components/loader/Loader';
import { RouteTypeEnum } from '../../routes/Routes.enum';
import { LayoutPageProperties, RouteProperties } from '../../routes/Routes.interfaces';
import { isPrivate, isSession } from '../../routes/types';
import { authSelector, validateLogin } from '../../slices/auth/Auth.slice';

interface AuthProperties<T = ReactNode> {
	appRoute: RouteProperties;
	template: FC<LayoutPageProperties>;
	route: RouteComponentProps<T>;
	type: RouteTypeEnum;
}

const Auth: FC<AuthProperties> = ({ appRoute, template, route, type }: AuthProperties) => {
	const dispatch = useDispatch();
	const { loading, response, errors } = useSelector(authSelector);

	useEffect(() => {
		dispatch(validateLogin());
	}, [dispatch]);

	const user = response && response.uuid;
	const error = errors && errors.status;

	/**
	 * authentication state
	 * init: loading
	 * success: dashboard
	 * error: login
	 */

	if (loading) {
		return <Loader />;
	} else if (isPrivate(type) && error && !user) {
		return <Redirect to={ENV().ROUTING.AUTH.LOGIN} />;
	} else if (isSession(type) && user) {
		return <Redirect to={ENV().ROUTING.PACKAGES.DASHBOARD} />;
	} else {
		const Layout = appRoute.template ? appRoute.template : template;
		return <Layout Component={appRoute.component} route={route} />;
	}
};
export default Auth;
