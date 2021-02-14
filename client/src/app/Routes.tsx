import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalLayout from './layouts/GlobalLayout';
import routesTemplates from './routes/index';
import Auth from './screens/authentication/Auth';
import Error404 from './screens/pages/404/Error404';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				{routesTemplates.map((routesTemplate) => {
					const { routes: appRoutes, template: Template, type } = routesTemplate;
					return appRoutes.map((appRoute) => (
						<Route
							exact={appRoute.exact}
							path={appRoute.path}
							key={appRoute.path}
							render={(route) => (
								<Auth
									appRoute={appRoute}
									Template={Template}
									route={route}
									type={type}
								/>
							)}
						/>
					));
				})}
				<Route render={(route) => <GlobalLayout Component={Error404} route={route} />} />
			</Switch>
		</BrowserRouter>
	);
};
export default Routes;
