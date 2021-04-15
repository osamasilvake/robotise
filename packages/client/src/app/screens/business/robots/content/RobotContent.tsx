import { Box, Tab, Tabs } from '@material-ui/core';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { RobotParamsInterface } from '../Robot.interface';
import robotsRoutes from '../Robots.routes';
import RobotDetail from './detail/RobotDetail';
import RobotInventory from './inventory/RobotInventory';

const RobotContent: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const [value, setValue] = useState(-1);
	const params: RobotParamsInterface = useParams();
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const cIndex = robotsRoutes.findIndex(
			(r) => r.path.replace(':id', params.id) === location.pathname
		);
		setValue(cIndex - 1);
	}, [location.pathname, params.id]);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		// prepare link
		const url = robotsRoutes[value + 1].path.replace(':id', params.id);

		// push to history
		history.push(url);
	};

	return value !== -1 ? (
		<Box>
			{/* Tabs */}
			<Tabs
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				allowScrollButtonsMobile
				textColor="primary">
				<Tab label={t('CONTENT.TABS.DETAIL')} />
				<Tab label={t('CONTENT.TABS.INVENTORY')} />
				<Tab label={t('CONTENT.TABS.ORDERS')} />
				<Tab label={t('CONTENT.TABS.PURCHASES')} />
				<Tab label={t('CONTENT.TABS.INFORMATION')} />
			</Tabs>

			{/* Tab Panel */}
			<Box>
				{/* Detail */}
				{value === 0 && <RobotDetail />}

				{/* Inventory */}
				{value === 1 && <RobotInventory />}

				{/* Orders */}
				{value === 2 && <>Three</>}

				{/* Purchases */}
				{value === 3 && <>Four</>}

				{/* Information */}
				{value === 4 && <>Five</>}
			</Box>
		</Box>
	) : null;
};
export default RobotContent;
