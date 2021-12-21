import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import RobotsList from './list/RobotsList';

const Robots: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="ROBOTS.TITLE" description="ROBOTS.DESCRIPTION" />

			{/* List */}
			<ErrorBoundary>
				<RobotsList />
			</ErrorBoundary>
		</Paper>
	);
};
export default Robots;
