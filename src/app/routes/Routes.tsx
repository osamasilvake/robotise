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
					const isUser = !!(auth.user && auth.user.data.user_id);
					return routes
						.filter(
							(r) =>
								!(
									isUser &&
									!validateScope(
										auth.user?.scope,
										AuthScopeTypeEnum.READ,
										r.path,
										r.scope
									)
								)
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
