import { Add, Assessment } from '@material-ui/icons';

import { SiteProductsActionsSpeedDialTypeEnum } from './SiteProductsActions.enum';

export const productActions = [
	{
		icon: <Assessment />,
		name: 'CONTENT.PRODUCTS.LIST.ACTIONS.SPEED_DIAL.PRODUCTS_REPORT',
		operation: SiteProductsActionsSpeedDialTypeEnum.PRODUCTS_REPORT
	},
	{
		icon: <Add />,
		name: 'CONTENT.PRODUCTS.LIST.ACTIONS.SPEED_DIAL.CREATE_PRODUCT',
		operation: SiteProductsActionsSpeedDialTypeEnum.CREATE_PRODUCT
	}
];
