import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { robotSelector, RobotServicePositionsFetch } from '../../../../slices/robots/Robot.slice';
import { robotTwinsSummarySelector } from '../../../../slices/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../Robot.interface';
import robotsRoutes from '../Robots.routes';
import RobotConfiguration from './configuration/RobotConfiguration';
import RobotDetail from './detail/RobotDetail';
import RobotInventory from './inventory/RobotInventory';
import RobotOrders from './orders/RobotOrders';
import RobotPurchases from './purchases/RobotPurchases';

const RobotContent: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [value, setValue] = useState(-1);
	const params: RobotParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	const cSiteId = robotTwinsSummary.content?.dataById[params.robot].site.id;
	const pSiteId = robot.servicePositions.content?.site?.id;

	useEffect(() => {
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':robot', params.robot) === location.pathname
		);
		setValue(cIndex - 1);
	}, [location.pathname, params.robot]);

	useEffect(() => {
		const condition1 = robot.servicePositions.content === null;
		const condition2 = robot.servicePositions.content !== null && cSiteId !== pSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch site service positions
			cSiteId && dispatch(RobotServicePositionsFetch(cSiteId));
		}
	}, [dispatch, pSiteId, cSiteId, robot.servicePositions.content]);

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
				<Tab label={t('CONTENT.TABS.CONFIGURATION')} />
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

				{/* Configuration */}
				{value === 4 && <RobotConfiguration />}
			</Box>
		</Box>
	) : null;
};
export default RobotContent;
