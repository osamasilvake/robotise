import { Box, Tab, Tabs } from '@material-ui/core';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import robotsRoutes from '../Robots.routes';
import RobotDetail from './detail/RobotContentDetail';
import { RobotContentParamsInterface } from './RobotContent.interface';

const RobotContent: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const [value, setValue] = useState(0);
	const params: RobotContentParamsInterface = useParams();
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
	const handleTabChange = (_event: ChangeEvent<unknown>, value: number) => {
		// prepare link
		const url = robotsRoutes[value + 1].path.replace(':id', params.id);

		// push to history
		history.push(url);
	};

	return (
		<Box>
			{/* Tabs */}
			<Tabs
				value={value}
				onChange={handleTabChange}
				variant="scrollable"
				scrollButtons="off"
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
				<Box hidden={value !== 0}>
					<RobotDetail />
				</Box>

				{/* Inventory */}
				<Box hidden={value !== 1}>Item Two</Box>

				{/* Orders */}
				<Box hidden={value !== 2}>Item Three</Box>

				{/* Purchases */}
				<Box hidden={value !== 3}>Item Four</Box>

				{/* Information */}
				<Box hidden={value !== 4}>Item Five</Box>
			</Box>
		</Box>
	);
};
export default RobotContent;
