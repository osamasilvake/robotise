import { Paper } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import PageHead from '../../../components/content/page-head/PageHead';
import { robotTwinsSummarySelector } from '../../../slices/robot-twins/RobotTwinsSummary.slice';
import RobotContent from './content/RobotContent';

const Robot: FC = () => {
	const robotTwins = useSelector(robotTwinsSummarySelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const id = robotTwins.content?.data[0].id;
	const cRobotName = id && robotTwinsSummary.content?.dataById[id]?.robot.name;

	return (
		<Paper elevation={12} component="section">
			{/* Page Head */}
			<PageHead
				title="ROBOTS.ROBOT.TITLE"
				description="ROBOTS.ROBOT.DESCRIPTION"
				currentLabel={!robotTwins.loader ? cRobotName : ''}
			/>

			{/* List */}
			<RobotContent />
		</Paper>
	);
};
export default Robot;
