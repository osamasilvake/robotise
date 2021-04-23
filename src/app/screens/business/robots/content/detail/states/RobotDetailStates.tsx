import { FC } from 'react';

import RobotDetailState from './RobotDetailState';
import { RobotDetailStatesInterface } from './RobotDetailStates.interface';
import { robotStates } from './RobotDetailStates.list';

const RobotDetailStates: FC<RobotDetailStatesInterface> = (props) => {
	const { robotTwin } = props;

	return (
		<>
			{robotStates(robotTwin).map((state) => (
				<RobotDetailState key={state.type} robotTwin={robotTwin} state={state} />
			))}
		</>
	);
};
export default RobotDetailStates;
