import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import PageHead from '../../../components/content/page-head/PageHead';
import { robotTwinsSelector } from '../../../slices/robot-twins/RobotTwins.slice';
import RobotContent from './content/RobotContent';

const Robot: FC = () => {
	const robotTwins = useSelector(robotTwinsSelector);
	const cRobotName = robotTwins.content?.data[0]?.robot.name;

	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead
				title="ROBOTS.ROBOT.TITLE"
				description="ROBOTS.ROBOT.DESCRIPTION"
				updatePageLabel={!robotTwins.loading ? cRobotName : ''}
			/>

			{/* List */}
			<RobotContent />
		</Box>
	);
};
export default Robot;
