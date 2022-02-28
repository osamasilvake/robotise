import { Liquor, ShoppingCart } from '@mui/icons-material';

import { RobotPurchasesActionsSpeedDialTypeEnum } from './RobotPurchasesActions.enum';

export const purchaseActions = [
	{
		icon: <ShoppingCart />,
		name: 'CONTENT.PURCHASES.LIST.ACTIONS.SPEED_DIAL.PURCHASES_REPORT',
		operation: RobotPurchasesActionsSpeedDialTypeEnum.PURCHASES_REPORT
	},
	{
		icon: <Liquor />,
		name: 'CONTENT.PURCHASES.LIST.ACTIONS.SPEED_DIAL.PRODUCTS_REPORT',
		operation: RobotPurchasesActionsSpeedDialTypeEnum.PRODUCTS_REPORT
	}
];
