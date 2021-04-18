import { FC } from 'react';

import RobotDetailState from './RobotDetailState';
import { RobotDetailStatesInterface } from './RobotDetailStates.interface';
import { robotStates } from './RobotDetailStates.list';

const RobotDetailStates: FC<RobotDetailStatesInterface> = (props) => {
	const { robot } = props;

	return (
		<>
			{robotStates(robot).map((state) => (
				<RobotDetailState key={state.type} robot={robot} state={state} />
			))}
		</>
	);
};
export default RobotDetailStates;
