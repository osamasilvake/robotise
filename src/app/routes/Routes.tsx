import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from '../screens/authentication/Auth';
import { AuthScopeTypeEnum } from '../screens/authentication/Auth.enum';
import { validateScope } from '../screens/authentication/Auth.scope';
import { authSelector } from '../slices/authentication/Auth.slice';
import routesTemplate from './Routes.template';

const RoutesCustom: FC = () => {
	const auth = useSelector(authSelector);

	return (
		<BrowserRouter>
			<Routes>
				{routesTemplate.map((item) => {
					const { template, routes, type } = item;
					const scope = auth.user?.scope;
					return routes
						.filter(
							(r) =>
								!(r.scope && !validateScope(scope, r.path, AuthScopeTypeEnum.READ))
						)
						.map((route) => (
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
export default RoutesCustom;
