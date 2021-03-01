import { lazy } from 'react';

import ENV from '../../../../environment';
import { RouteInterface } from '../../../routes/Routes.interfaces';

const Products = lazy(() => import('./Products'));

const productRoutes: RouteInterface[] = [
	{
		component: Products,
		exact: true,
		path: ENV().ROUTING.PACKAGES.PRODUCTS.MAIN
	}
];
export default productRoutes;
