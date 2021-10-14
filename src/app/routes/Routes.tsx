import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalLayout from '../layouts/global/GlobalLayout';
import Auth from '../screens/authentication/Auth';
import Error404 from '../screens/pages/404/Error404';
import routesTemplates from './Routes.template';

const Routes: FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				{routesTemplates.map((routesTemplate) => {
					const { routes: appRoutes, template, type } = routesTemplate;
					return appRoutes.map((appRoute) => (
						<Route
							key={appRoute.path}
							exact={appRoute.exact}
							path={appRoute.path}
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
