import React, { FC, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import ENV from '../environment/index';

// lazy load components
const Login = lazy(() => import('./screens/authentication/login/Login'));
const Dashboard = lazy(() => import('./screens/packages/dashboard/Dashboard'));
const Error404 = lazy(() => import('./screens/pages/404/Error404'));

const AppRouter: FC = () => {
	return (
		<Switch>
			<Route exact path={ENV().ROUTING.AUTH.LOGIN} component={Login} />
			<Route exact path={ENV().ROUTING.PACKAGES.DASHBOARD} component={Dashboard} />
			<Route exact from="*" component={Error404} />
		</Switch>
	);
};
export default AppRouter;
