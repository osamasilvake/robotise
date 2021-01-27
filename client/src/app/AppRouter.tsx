import React, { FC, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import ENV from '../environment/index';

// lazy load components
const Home = lazy(() => import('./screens/home/Home'));
const Error404 = lazy(() => import('./screens/404/Error404'));

const AppRouter: FC = () => {
	return (
		<Switch>
			<Route exact path={ENV().ROUTING.HOME} component={Home} />
			<Route exact from="*" component={Error404} />
		</Switch>
	);
};
export default AppRouter;
