import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { RobotParamsInterface } from '../Robot.interface';
import robotsRoutes from '../Robots.routes';
import RobotDetail from './detail/RobotDetail';
import RobotInventory from './inventory/RobotInventory';
import RobotOrders from './orders/RobotOrders';
import RobotPurchases from './purchases/RobotPurchases';

const RobotContent: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const [value, setValue] = useState(-1);
	const params: RobotParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':robot', params.robot) === location.pathname
		);
		setValue(cIndex - 1);
	}, [location.pathname, params.robot]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = robotsRoutes[value + 1].path.replace(':robot', params.robot);

		// push to history
		history.push(url);
	};

	return value !== -1 ? (
		<Box>
			{/* Tabs */}
			<Tabs value={value} onChange={handleTabChange} variant="scrollable" textColor="primary">
				<Tab label={t('CONTENT.TABS.DETAIL')} />
				<Tab label={t('CONTENT.TABS.INVENTORY')} />
				<Tab label={t('CONTENT.TABS.ORDERS')} />
				<Tab label={t('CONTENT.TABS.PURCHASES')} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Detail */}
				{value === 0 && <RobotDetail />}

				{/* Inventory */}
				{value === 1 && <RobotInventory />}

				{/* Orders */}
				{value === 2 && <RobotOrders />}

				{/* Purchases */}
				{value === 3 && <RobotPurchases />}
			</Box>
		</Box>
	) : null;
};
export default RobotContent;
