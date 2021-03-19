import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

import PageHead from '../../../../components/content/page-head/PageHead';
import RobotDetail from './detail/RobotDetail';

const Robot: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const [value, setValue] = useState(0);

	/**
	 * handle tab change
	 * @param _event
	 * @param value
	 */
	const handleTabChange = (_event: ChangeEvent<unknown>, value: number) => {
		setValue(value);
	};

	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="ROBOTS.ROBOT.TITLE" description="ROBOTS.ROBOT.DESCRIPTION" />

			{/* Tabs */}
			<Paper square elevation={12}>
				<Tabs
					value={value}
					onChange={handleTabChange}
					variant="scrollable"
					scrollButtons="off"
					textColor="primary">
					<Tab label={t('CONTENT.TABS.DETAIL')} />
					<Tab label={t('CONTENT.TABS.ORDERS')} />
					<Tab label={t('CONTENT.TABS.PURCHASES')} />
					<Tab label={t('CONTENT.TABS.INFORMATION')} />
				</Tabs>

				{/* Detail */}
				<Box hidden={value !== 0}>
					<RobotDetail />
				</Box>

				{/* Orders */}
				<Box hidden={value !== 1}>Item Two</Box>

				{/* Purchases */}
				<Box hidden={value !== 2}>Item Three</Box>

				{/* Information */}
				<Box hidden={value !== 3}>Item Three</Box>
			</Paper>
		</Box>
	);
};
export default Robot;
