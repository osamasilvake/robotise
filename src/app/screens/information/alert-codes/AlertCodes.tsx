import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import AlertCodesList from './list/AlertCodesList';

const AlertCodes: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="ALERT_CODES.TITLE" description="ALERT_CODES.DESCRIPTION" />

			{/* List */}
			<ErrorBoundary>
				<AlertCodesList />
			</ErrorBoundary>
		</Paper>
	);
};
export default AlertCodes;
