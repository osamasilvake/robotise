import { Box } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import RobotsList from './list/RobotsList';

const Robots: FC = () => {
	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="ROBOTS.TITLE" description="ROBOTS.DESCRIPTION" />

			{/* List */}
			<RobotsList />
		</Box>
	);
};
export default Robots;
