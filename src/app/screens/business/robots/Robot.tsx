import { Paper } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { robotTwinsSummarySelector } from '../../../slices/robot-twins/RobotTwinsSummary.slice';
import RobotContent from './content/RobotContent';
import { RobotParamsInterface } from './Robot.interface';

const Robot: FC = () => {
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: RobotParamsInterface = useParams();

	const cRobotName = robotTwinsSummary.content?.dataById[params.robot]?.robot.name;

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="ROBOTS.ROBOT.TITLE"
				description="ROBOTS.ROBOT.DESCRIPTION"
				currentLabel={!robotTwinsSummary.loader ? cRobotName : ''}
			/>

			{/* List */}
			<RobotContent />
		</Paper>
	);
};
export default Robot;
