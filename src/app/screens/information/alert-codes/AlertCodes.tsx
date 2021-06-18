import { Paper } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import AlertCodesList from './list/AlertCodesList';

const AlertCodes: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="ALERT_CODES.TITLE" description="ALERT_CODES.DESCRIPTION" />

			{/* List */}
			<AlertCodesList />
		</Paper>
	);
};
export default AlertCodes;
