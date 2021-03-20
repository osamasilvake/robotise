import { Box } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import RobotContent from './content/RobotContent';

const Robot: FC = () => {
	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="ROBOTS.ROBOT.TITLE" description="ROBOTS.ROBOT.DESCRIPTION" />

			{/* List */}
			<RobotContent />
		</Box>
	);
};
export default Robot;
