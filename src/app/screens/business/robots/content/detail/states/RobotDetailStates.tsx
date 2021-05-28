import { FC } from 'react';

import RobotDetailState from './RobotDetailState';
import { RobotDetailStatesInterface } from './RobotDetailStates.interface';
import { robotStates } from './RobotDetailStates.list';

const RobotDetailStates: FC<RobotDetailStatesInterface> = (props) => {
	const { robotTwins } = props;

	return (
		<>
			{robotStates(robotTwins).map((state) => (
				<RobotDetailState key={state.type} robotTwins={robotTwins} state={state} />
			))}
		</>
	);
};
export default RobotDetailStates;
