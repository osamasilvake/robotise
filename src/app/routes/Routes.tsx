import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from '../screens/authentication/Auth';
import routesTemplate from './Routes.template';

const RoutesC: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routesTemplate.map((item) => {
					const { template, routes, type } = item;
					return routes.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={<Auth template={template} route={route} type={type} />}
						/>
					));
				})}
			</Routes>
		</BrowserRouter>
	);
};
export default RoutesC;
