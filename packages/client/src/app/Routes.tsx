import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './Auth';
import GlobalLayout from './layouts/global/GlobalLayout';
import routesTemplates from './routes/index';
import Error404 from './screens/pages/404/Error404';

const Routes: FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				{routesTemplates.map((routesTemplate) => {
					const { routes: appRoutes, template, type } = routesTemplate;
					return appRoutes.map((appRoute) => (
						<Route
							exact={appRoute.exact}
							path={appRoute.path}
							key={appRoute.path}
							render={(route) => (
								<Auth
									appRoute={appRoute}
									template={template}
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
